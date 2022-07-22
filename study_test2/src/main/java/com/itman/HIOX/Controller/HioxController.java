package com.itman.HIOX.Controller;


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
	
	@RequestMapping(value="/hiox")
	public String main(Model model, HttpServletRequest req, HttpServletResponse rep) {
		if(paging == null) {
			PagingAlloc();
		}
		
		Map<String, List<String>> cdList = getCdList();
		
		model.addAttribute("texture_list", cdList.get("texture_list"));
		model.addAttribute("thickness_list", cdList.get("thickness_list"));
		model.addAttribute("size_list", cdList.get("size_list"));
		
		return "hioxMain";
	}

	@RequestMapping(value="selectHiox", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody
	public Map<String,Object> select(@RequestBody Map<String, Object> params, Model model) {
		Map<String,Object> msg = new HashMap<String, Object>();
		try {
			params.put("pageSize", paging.getPageSize());
			
			msg.put("SUCC", service.select(params));
			paging.setCurrentPage(Integer.parseInt(String.valueOf(params.get("page"))));
			msg.put("pageList", paging.pageList());
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
		//paging = new Paging(service.getTotalCount());
		paging = new Paging(2001);
	}
}
