package com.itman.HIOX.mapper;

import java.util.List;
import java.util.Map;

public interface HioxMapper {
	// 테이블 전체 출력
	public List<Map<String, Object>> selectAll(int offset) throws Exception;
	// 검색 row 출력
	public List<Map<String, Object>> select(Map<String, Object> params);
	// 재질 리스트 출력
	public List<Map<String, Object>> cd_List();
	// 출고 변경
	public boolean releaseHiox(List<Integer> list);
	// 출고 취소 변경
	public boolean releaseCancelHiox(List<Integer> list);
	// 전체 레코드 수 조회
	public int getTotalCount();
}
