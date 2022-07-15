package com.itman.main.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itman.main.mapper.TestMapper;
import com.itman.main.util.Student;

//import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service
public class TestServiceImpl implements TestService {
	@Autowired
	private TestMapper mapper;
	@Override
	public String selectVersion() throws Exception {
		return mapper.selectVersion();
	}
	@Override
	public List<Map<String, Object>> selectStudentAll() throws Exception {
		return mapper.selectStudentAll();
	}
	@Override
	public List<Map<String, String>> selectTest(Map<String, Object> params) throws Exception {
		return mapper.selectTest(params);
	}
	@Override
	public List<Map<String, String>> selectName(Map<String, Object> params) throws Exception {

		return mapper.selectName(params);
	}
	@Override
	public boolean deleteTest(int idx) throws Exception {
		return mapper.deleteTest(idx);
	}
	@Override
	public boolean insertTest(Student student) throws Exception {
		return mapper.insertTest(student);
	}
	@Override
	public boolean updateTest(Student student) throws Exception {
		return mapper.updateTest(student);
	}
	
}
