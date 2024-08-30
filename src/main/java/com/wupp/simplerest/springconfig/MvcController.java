package com.wupp.simplerest.springconfig;

import com.wupp.simplerest.EmployeeRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcController {

	private final EmployeeRepository repository;

	public MvcController(EmployeeRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/index")
	public String showUserList(Model model) {
		return "index";
	}

}
