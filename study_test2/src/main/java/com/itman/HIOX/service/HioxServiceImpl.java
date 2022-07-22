package com.itman.HIOX.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itman.HIOX.mapper.HioxMapper;

@Service
public class HioxServiceImpl implements HioxService {
	
	@Autowired
	private HioxMapper mapper;
	// 재질/두께/크기유형 리스트 조회
	@Override
	public List<Map<String, Object>> cd_List() {
		return mapper.cd_List();
	}
	// 조건에 맞는 row 숫자 조회
	@Override
	public int getTotalCount(Map<String, Object> params) {
		return mapper.getTotalCount(params);
	}
	// 조건에 맞는 row 조회
	@Override
	public List<Map<String, Object>> select(Map<String, Object> params) throws Exception {
		int offset = calOffset(params.get("page"), params.get("pageSize"));
		params.put("offset", offset);
		return mapper.select(params);
	}
	// 선택한 row 출고여부 1로 update
	@Override
	public boolean releaseHiox(List<Integer> list) {
		return mapper.releaseHiox(list);
	}
	// 선택한 row 출고여부 0으로 update
	@Override
	public boolean releaseCancelHiox(List<Integer> list) {
		return mapper.releaseCancelHiox(list);
	}
	// 선택한 row 삭제
	@Override
	public boolean deleteHiox(List<Integer> list) {
		return mapper.deleteHiox(list);
	}
	// 오프셋 계산
	private int calOffset(Object ob, Object size) {
		int offset = 0;
		int pagesize = 0;
		String page = String.valueOf(ob);
		String sizeString = String.valueOf(size);
		try { 
			offset = Integer.parseInt(page);
			pagesize = Integer.parseInt(sizeString);
			// 데이터 페이징을 위한 오프셋
			offset = (offset - 1)*pagesize;
			return offset;
		}
		// page 파라미터가 숫자로 변환할 수 없는 값이 들어왔을 경우
		catch(NumberFormatException e) {
			return 0;
		}
	}
}
