package com.wupp.simplerest;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class EmployeeRestController {

	private final EmployeeRepository repository;

	public EmployeeRestController(EmployeeRepository repository) {
		this.repository = repository;
	}

	@GetMapping(path="/rest/employees", produces="application/json")
	public Iterable<Employee> all() {
		return repository.findAll();
	}

	@PostMapping(path="/rest/employees", consumes = "application/json", produces="application/json")
	public Iterable<Employee> newEmployee(@RequestBody Employee newEmployee) {
		repository.save(newEmployee);
		return repository.findAll();
	}

	@GetMapping("/rest/employees/{id}")
	public Employee one(@PathVariable Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new EmployeeNotFoundException(id));
	}

	@PutMapping("/rest/employees/{id}")
	public Employee updateEmployee(@RequestBody Employee updatedEmployee, @PathVariable Long id) {
		
		return repository.findById(id)
			.map(employee -> {
				employee.setFirstName(updatedEmployee.getFirstName());
				employee.setLastName(updatedEmployee.getLastName());
				employee.setRole(updatedEmployee.getRole());
				employee.setEmail(updatedEmployee.getEmail());
				return repository.save(employee);
			})
			.orElseGet(() -> {
				updatedEmployee.setId(id);
				return repository.save(updatedEmployee);
			});
	}

	@DeleteMapping("/rest/employees/{id}")
	public Iterable<Employee> deleteEmployee(@PathVariable Long id) {
		repository.deleteById(id);
		return repository.findAll();
	}
}