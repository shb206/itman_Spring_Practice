package com.itman.main.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itman.main.service.TestService;
import com.itman.main.util.Student;



@Controller
@RequestMapping(value="/")
public class TestController {
	private static final String testMessage = "~~~~~~~~~";
	@Autowired
	private TestService service;
	
	@RequestMapping(value="/")
	public String main(Model model /*, @RequestBody Map<String, Object> map */) {
		try {
			String msg = service.selectVersion();
			//model.addAttribute("TestM", testMessage);
			model.addAttribute("myb", msg);
			//model.addAttribute("TestM", req.getParameter("tesVal"));
			//model.addAttribute("TestM", map.get("test"));
		} catch (Exception e) {
			e.printStackTrace();
		}		
		
		return "shin";
	}
	
	@RequestMapping(value="selectAll", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody
	public Map<String,Object> selectAll(@RequestBody Map<String, Object> params, Model model) {
		Map<String,Object> msg = new HashMap<String, Object>();
		try {
			msg.put("SUCC", service.selectStudentAll());
		} catch (Exception e) {
			e.printStackTrace();
			msg.put("FAIL", "non_data");
		}
		return msg;
	}
	
	@RequestMapping(value="selectTest", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody 
	public Map<String, Object> selectTest(@RequestBody Map<String, Object> params) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(params.get("type").equals("name")) {
				map.put("SUCC", service.selectName(params));
			}
			else {
				map.put("SUCC", service.selectTest(params));
			}	
		} catch (Exception e) {
			e.printStackTrace();
			map.put("FAIL", "fail");
		}
		return map;
	}
	
	@RequestMapping(value="deleteTest", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody 
	public Map<String, Object> deleteTest(@RequestBody Map<String, Object> params) {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Integer> list = new ArrayList<Integer>(); 
		try {
			list = (ArrayList<Integer>) params.get("Message");
			for(int i : list) {
				service.deleteTest(i);
			}
			map.put("SUCC", params.get("Message"));
		} catch (Exception e) {
			e.printStackTrace();
			map.put("FAIL", "해당 학생이 존재하지 않습니다.");
		}
		return map;
	}
	
	@RequestMapping(value="insertTest", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody 
	public Map<String, Object> insertTest(@RequestBody Student params) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			service.insertTest(params);
			map.put("SUCC", params);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("FAIL", "학번은 중복될 수 없습니다.");
		}
		return map;
	}
	
	@RequestMapping(value="updateTest", method=RequestMethod.POST, headers="Accept=application/json",produces = "application/json")
	@ResponseBody 
	public Map<String, Object> updateTest(@RequestBody Student params) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			service.updateTest(params);
			map.put("SUCC", params);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("FAIL", "수정 실패");
		}
		return map;
	}
	
	@RequestMapping(value="/select_subView")
	public String select_sub() {
		return "/sub_view/select_subView";
	}
	@RequestMapping(value="/update_subView")
	public String update_sub() {
		return "/sub_view/update_subView";
	}
	@RequestMapping(value="/insert_subView")
	public String insert_sub() {
		return "/sub_view/insert_subView";
	}
}
