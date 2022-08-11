package com.wupp.simplerest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ApplicationController {

	private final EmployeeRepository repository;

	public ApplicationController(EmployeeRepository repository) {
		this.repository = repository;
	}

	@RequestMapping("/")
	public String index() {
		return "forward:/index";
	}
	
	@GetMapping("/index")
	public String showUserList(Model model) {
		model.addAttribute("employees", repository.findAll());
		return "index";
	}

	@GetMapping("/addEmployee")
	public ModelAndView showUserList(ModelAndView mav) {
		mav.addObject("employees", repository.findAll());
		mav.setViewName("/addEmployee");
		return mav;
	}

}
