package com.itman.HIOX.mapper;

import java.util.List;
import java.util.Map;

public interface HioxMapper {
	// 재질/두께/크기유형 리스트 출력
	public List<Map<String, Object>> cd_List();
	// 조건에 맞는 레코드 수 조회
	public int getTotalCount(Map<String, Object> params);
	// 검색 row 출력
	public List<Map<String, Object>> select(Map<String, Object> params);
	// 출고 변경
	public boolean releaseHiox(List<Integer> list);
	// 출고 취소 변경
	public boolean releaseCancelHiox(List<Integer> list);
	// row 삭제
	public boolean deleteHiox(List<Integer> list);
}
