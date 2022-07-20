package com.itman.HIOX.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itman.HIOX.mapper.HioxMapper;

@Service
public class HioxServiceImpl implements HioxService {
	
	@Autowired
	private HioxMapper mapper;
	
	@Override
	public List<Map<String, Object>> selectAll(Map<String, Object> params) throws Exception {
		int offset = 1;
		String page = String.valueOf(params.get("page"));
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try { 
			offset = Integer.parseInt(page);
			offset = (offset - 1)*10;
			return mapper.selectAll(offset);
		}
		catch(NumberFormatException e) {
			return mapper.selectAll(offset);
		}
	}

	@Override
	public List<Map<String, Object>> select(Map<String, Object> params) throws Exception {
		return mapper.select(params);
	}

	@Override
	public List<Map<String, Object>> cd_List() {
		return mapper.cd_List();
	}

	@Override
	public boolean releaseHiox(List<Integer> list) {
		return mapper.releaseHiox(list);
	}

	@Override
	public boolean releaseCancelHiox(List<Integer> list) {
		return mapper.releaseCancelHiox(list);
	}

	@Override
	public int getTotalCount() {
		return mapper.getTotalCount();
	}

}
