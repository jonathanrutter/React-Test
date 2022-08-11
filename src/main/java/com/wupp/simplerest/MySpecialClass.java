package com.wupp.simplerest;

import org.springframework.stereotype.Component;

@Component
public class MySpecialClass {

	public String getMyMessage() {
		String test =  
				"""
				hello
				world
				!!
				""";
		
		return test;
	}
}
