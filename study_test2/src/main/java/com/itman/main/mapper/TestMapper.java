package com.itman.main.mapper;

import java.util.List;
import java.util.Map;

import com.itman.main.util.Student;

//import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface TestMapper {
	// MariaDB의 버전을 출력
	public String selectVersion() throws Exception;
	// student 테이블의 전체 목록를 출력
	public List<Map<String, Object>> selectStudentAll() throws Exception;
	// 입력된 값의 데이터를 출력
	public List<Map<String, String>> selectTest(Map<String, Object> params) throws Exception;
	// 이름으로 검색
	public List<Map<String, String>> selectName(Map<String, Object> params) throws Exception;
	// 입력된 index의 갈럼을 삭제
	public boolean deleteTest(int idx);
	// 입력된 index의 칼럼을 수정함
	public boolean updateTest(Student student);
	// 들어온 데이터를 student 테이블에 삽입
	public boolean insertTest(Student student);
}
