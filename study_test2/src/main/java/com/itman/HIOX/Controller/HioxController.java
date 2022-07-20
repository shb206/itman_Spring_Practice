package com.itman.HIOX.Controller;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itman.HIOX.service.HioxService;
import com.itman.HIOX.util.Paging;

@Controller
public class HioxController {
	@Autowired
	private HioxService service;
	private Paging paging;
	private int page = 0;
	
	@RequestMapping(value="/hiox")
	public String main(Model model, HttpServletRequest req, HttpServletResponse rep) {
		if(paging == null) {
			PagingAlloc();
		}
		LocalDate now = LocalDate.now();
		
		Map<String, List<String>> cdList = getCdList();
		List<Integer> pageList = new ArrayList<Integer>();
		
		model.addAttribute("texture_list", cdList.get("texture_list"));
		model.addAttribute("thickness_list", cdList.get("thickness_list"));
		model.addAttribute("size_list", cdList.get("size_list"));

		//paging.setTotalRecord(service.getTotalCount());
		if(req.getParameter("page") != null) {
			try {
				page = Integer.parseInt(req.getParameter("page"));
				paging.setCurrentPage(page);
			} 
			catch(NumberFormatException e) {
				paging.setCurrentPage(1);
			}
		}
		else
			paging.setCurrentPage(1);
		
		pageList = paging.pageList();
		
//		System.out.println("넘어온 페이지 : " + req.getParameter("page"));
//		System.out.println("세팅된 페이지 : " + paging.getCurrentPage());
//		System.out.println("마지막 페이지 : " + pageList.get(pageList.size()-1));
		
		model.addAttribute("pageList", pageList);
		model.addAttribute("lastPage", pageList.get(pageList.size()-1));
		model.addAttribute("today", now);
		
		return "hioxMain";
	}
	@RequestMapping(value="selectHioxAll", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody
	public Map<String,Object> selectAll(@RequestBody Map<String, Object> params, Model model) {
		Map<String,Object> msg = new HashMap<String, Object>();
		try {
			msg.put("SUCC", service.selectAll(params));
		} catch (Exception e) {
			e.printStackTrace();
			msg.put("FAIL", "non_data");
		}
		return msg;
	}
	@RequestMapping(value="selectHiox", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody
	public Map<String,Object> select(@RequestBody Map<String, Object> params, Model model) {
		Map<String,Object> msg = new HashMap<String, Object>();
		try {
			if(params.get("texture").equals("---재질---"))
				params.remove("texture");
			if(params.get("thickness").equals("---두께---"))
				params.remove("thickness");
			if(params.get("size").equals("---크기유형---"))
				params.remove("size");

			//System.out.println(params);
			msg.put("SUCC", service.select(params));
		} catch (Exception e) {
			e.printStackTrace();
			msg.put("FAIL", "non_data");
		}
		return msg;
	}
	@RequestMapping(value="releaseHiox", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody
	public Map<String,Object> releaseHiox(@RequestBody Map<String, Object> params, Model model) {
		Map<String,Object> msg = new HashMap<String, Object>();
		List<Integer> list = (ArrayList<Integer>) params.get("Message");
		try {
			if(params.get("release").equals("release")) {
				service.releaseHiox(list);
			}
			else if(params.get("release").equals("cancel")){
				service.releaseCancelHiox(list);
			}
				
			//msg.put("SUCC", service.selectAll());
		} catch (Exception e) {
			e.printStackTrace();
			msg.put("FAIL", "non_data");
		}
		return msg;
	}
	
	private Map<String, List<String>> getCdList() {
		Map<String, List<String>> cdList = new HashMap<String, List<String>>();
		
		List<Map<String, Object>> list = service.cd_List();

		List<String> texture_list = new ArrayList<String>();
		List<String> thickness_list = new ArrayList<String>();
		List<String> size_list = new ArrayList<String>();
		
		for(int i = 0; i < list.size(); i++) {
			switch ((String)list.get(i).get("COMM_GRP_CD")) {
			case "GTexture":
				texture_list.add((String)list.get(i).get("COMM_CD_NM"));
				break;
			case "GThickness":
				thickness_list.add((String)list.get(i).get("COMM_CD_NM"));
				break;
			case "GSize":
				size_list.add((String)list.get(i).get("COMM_CD_NM"));
				break;
			}
		}
		cdList.put("texture_list", texture_list);
		cdList.put("thickness_list", thickness_list);
		cdList.put("size_list", size_list);
		
		return cdList;
	}
	private void PagingAlloc() {
		paging = new Paging(service.getTotalCount());
		//paging = new Paging(200);
	}
}
