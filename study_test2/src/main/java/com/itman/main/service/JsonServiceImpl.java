package com.itman.main.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.XML;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itman.main.mapper.JsonMapper;
import com.itman.main.util.json.JsonIO;

@Service
public class JsonServiceImpl implements JsonService {
	@Autowired
	private JsonMapper mapper;
	@Override
	public List<Map<String, Object>> selectAll() throws Exception {
		return mapper.selectAll();
	}
	@Override
	public boolean deleteJson(int cpId) throws Exception {
		return mapper.deleteJson(cpId);
	}
	@Override
	public boolean insertParseJson(JSONObject jList) throws Exception {
		JsonIO jsonIo = new JsonIO();
		JSONArray jArr = (JSONArray) jList.get("data");
		
		return mapper.insertParseJson(jArr);
	}
	@Override
	public boolean insertParseXml(String xml) throws Exception {
		JsonIO jsonIO = new JsonIO();
		JSONArray jsonArray = new JSONArray();
		
		// xml 파일 구조를 따라 실제 데이터까지 들어감
		org.json.JSONObject job = XML.toJSONObject(xml);
		org.json.JSONArray jArr =  job.getJSONObject("results")
											.getJSONObject("data")
											.getJSONArray("item");
		
		for(int i = 0; i < jArr.length(); i++) {
			org.json.JSONObject job_sub = (org.json.JSONObject) jArr.get(i);
			// 
			org.json.JSONArray jArr_sub = job_sub.getJSONArray(("col"));
			Map<String, Object> map = new HashMap<String, Object>();
			for(int j = 0; j < jArr_sub.length(); j++) {
				map.put((String) jArr_sub.getJSONObject(j).get("name"), jArr_sub.getJSONObject(j).get("content"));
			}
			jsonArray.add(jsonIO.mapToJson(map));
		}
		
        //return true;
		return mapper.insertParseJson(jsonArray);
	}
}
