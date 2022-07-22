package com.itman.main;

import com.itman.HIOX.util.Paging;

public class TestMain {

	public static void main(String[] args) {

		Paging page = new Paging(201);
		page.setCurrentPage(21);
		System.out.println(page.pageList());
	}

}
