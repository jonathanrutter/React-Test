package com.wupp.simplerest;

import org.springframework.data.repository.CrudRepository;


/**
 * We can directly access the EmployeeRepo using:
 * localhost:8082/api/employees/1
 * 
 * Where port number and 'api' are defined in application.properties
 */
public interface EmployeeRepository extends CrudRepository<Employee, Long> {


}