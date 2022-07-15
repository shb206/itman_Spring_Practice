package com.itman.main.service;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;

public interface JsonService {
	public List<Map<String, Object>> selectAll() throws Exception;
	public boolean insertParseJson(JSONObject jObj) throws Exception;
	public boolean insertParseXml(String xml) throws Exception;
	public boolean deleteJson(int cpId) throws Exception;
}
