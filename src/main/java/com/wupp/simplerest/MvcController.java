package com.wupp.simplerest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MvcController {

	private final EmployeeRepository repository;

	public MvcController(EmployeeRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/index")
	public String showUserList(Model model) {
//		model.addAttribute("employees", repository.findAll());
		return "index";
	}

	@PostMapping("/employeeByForm")
	public ModelAndView addUserByFormSubmissionObj(@RequestParam Object firstName, @RequestParam Object lastName, 
			@RequestParam Object email, @RequestParam Object role, ModelAndView mav) {
		Employee employee = new Employee(firstName.toString(), lastName.toString(), role.toString(), email.toString());
		repository.save(employee);
		mav.addObject("employees", repository.findAll());
		mav.setViewName("addEmployee");
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
		mav.setViewName("addEmployee");
		return mav;
	}

}
