package com.itman.main.util.json;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.XML;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.util.ObjectUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonIO {
	// 로컬 경로에 json 파일을 저장
	public void writeJson(JSONObject jObj, String path, String fileName) throws IOException {
		FileWriter file = new FileWriter(path + fileName + ".json");
		file.write(jObj.toJSONString());
		file.flush();
		file.close();
	}
	// 로컬 경로의 json 파일을 읽어 JSONObject로 반환
	public JSONObject readJson(String path) throws IOException, ParseException {
		JSONParser parser = new JSONParser();
		Reader reader = new FileReader(path);
		JSONObject jsonObject = (JSONObject) parser.parse(reader);
		return jsonObject;
	}
	// JSONObject -> Map
	public Map<String, Object> jsonToMap(JSONObject jObj) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map = new ObjectMapper().readValue(jObj.toString(), Map.class);
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}
	// Map -> JSONObject
	public JSONObject mapToJson(Map<String, Object> map) {
		JSONObject json = new JSONObject();
		String key = "";
		Object value = null;
		
		for(Map.Entry<String, Object> entry : map.entrySet()) {
			key = entry.getKey();
			value = entry.getValue();
			json.put(key, value);
		}
		return json;
	}
}
