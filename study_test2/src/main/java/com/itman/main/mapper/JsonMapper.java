package com.itman.main.mapper;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public interface JsonMapper {
	// evsearchlist 테이블 전체 목록을 출력
	public List<Map<String, Object>> selectAll() throws Exception;
	// evsearchlist 파싱 데이터 여러개 입력
	public boolean insertParseJson(JSONArray jList);
	public boolean deleteJson(int cpId);
}
