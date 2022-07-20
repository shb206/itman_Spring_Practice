package com.itman.HIOX.service;

import java.util.List;
import java.util.Map;

public interface HioxService {
	public List<Map<String, Object>> selectAll(Map<String, Object> params) throws Exception;
	public List<Map<String, Object>> select(Map<String, Object> params) throws Exception;
	public List<Map<String, Object>> cd_List();
	public boolean releaseHiox(List<Integer> list);
	public boolean releaseCancelHiox(List<Integer> list);
	public int getTotalCount();
}
