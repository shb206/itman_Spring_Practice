package com.itman.main.service;

import java.util.List;
import java.util.Map;

import com.itman.main.util.Student;

//import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface TestService {
	public String selectVersion() throws Exception;
	public List<Map<String, Object>> selectStudentAll() throws Exception;
	public List<Map<String, String>> selectTest(Map<String, Object> params) throws Exception;
	public List<Map<String, String>> selectName(Map<String, Object> params) throws Exception;
	public boolean deleteTest(int idx) throws Exception;
	public boolean updateTest(Student student) throws Exception;
	public boolean insertTest(Student student) throws Exception;
}
