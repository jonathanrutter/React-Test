package com.wupp.simplerest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@PostMapping("/employeeByForm")
	public ModelAndView addUserByFormSubmissionObj(@RequestParam Object name, 
			@RequestParam Object email, @RequestParam Object role, ModelAndView mav) {
		Employee employee = new Employee(name.toString(), role.toString(), email.toString());
		repository.save(employee);
		mav.addObject("employees", repository.findAll());
		mav.setViewName("redirect:/index");
		return mav;
	}

	@GetMapping("/addEmployee")
	public ModelAndView showUserList(ModelAndView mav) {
		mav.addObject("employees", repository.findAll());
		mav.setViewName("addEmployee");
		return mav;
	}

	
	@GetMapping("/delete/{id}")
	public ModelAndView deleteEmployee(@PathVariable Long id, ModelAndView mav) {
		repository.deleteById(id);
		mav.addObject("employees", repository.findAll());
		mav.setViewName("redirect:/index");
		return mav;
	}

}
