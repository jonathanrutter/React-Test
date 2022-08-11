package com.wupp.simplerest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

interface EmployeeRepository extends CrudRepository<Employee, Long> {
//interface EmployeeRepository extends JpaRepository<Employee, Long> {

}