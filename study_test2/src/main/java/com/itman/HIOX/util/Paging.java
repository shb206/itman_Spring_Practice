package com.itman.HIOX.util;

import java.util.ArrayList;
import java.util.List;


public class Paging {
	// 현재 페이지 위치
	private int currentPage = 0;
	// 페이지 당 보여줄 레코드 수
	private int pageSize;
	// 전체 레코드 수
	private int totalRecord;
	// 전체 페이지 수
	private int totalPage;

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		if(currentPage > totalPage)
			this.currentPage = totalPage;
		else if(currentPage < 1)
			this.currentPage = 1;
		else
			this.currentPage = currentPage;
	}
	
	public int getPrevPage() {
		if(currentPage - 1 <= 0) {
			return 1;
		}
		return currentPage - 1;
	}
	
	public int getNextPage() {
		if(currentPage + 1 > totalPage) {
			return totalPage;
		}
		return currentPage + 1;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
	}

	public void getTotalPage() {
		if(totalRecord <= pageSize) {
			totalPage = 1;
		}
		if(totalRecord % pageSize == 0) {
			totalPage = totalRecord / pageSize;
		}
		else
			totalPage = totalRecord / pageSize + 1;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	
	public Paging(int totalRecord) {
		currentPage = 1;
		pageSize = 10;
		this.totalRecord = totalRecord;
		getTotalPage();
	}
	// 현재 페이지 기준 view 단에 보여줄 페이지 리스트
	public List<Integer> pageList() {
		List<Integer> list = new ArrayList<Integer>();
		int startPage;
		if(currentPage % 10 == 0) {
			startPage = ((currentPage - 1) / 10) * 10 + 1;
		}
		else
			startPage = (currentPage / 10) * 10 + 1;
		
		for(int i = 0; i < 10; i++) {
			if(startPage + i > totalPage)
				break;
			list.add(startPage + i);
		}
		return list;
	}
}
