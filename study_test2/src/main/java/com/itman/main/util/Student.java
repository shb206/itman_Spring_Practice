package com.itman.main.util;

public class Student {
	private int idx;
	private String name;
	private int code;
	private int score;
	
	public Student() {
		// TODO Auto-generated constructor stub
	}

	public Student(int idx, String name, int code, int score) {
		this.idx = idx;
		this.name = name;
		this.code = code;
		this.score = score;
	}

	public int getIdx() {
		return idx;
	}

	public void setIdx(int idx) {
		this.idx = idx;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	@Override
	public String toString() {
		return "Student [idx=" + idx + ", name=" + name + ", code=" + code + ", score=" + score + "]";
	}
}
