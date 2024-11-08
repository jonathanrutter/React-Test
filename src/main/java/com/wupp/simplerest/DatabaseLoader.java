package com.wupp.simplerest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseLoader implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(DatabaseLoader.class);

	@Autowired
	private EmployeeRepository repository;
	
	public DatabaseLoader() {
		// Empty constructor
	}
	
	@Override
	public void run(String... args) throws Exception {
		log.info("Preloading " + repository.save(new Employee("Fred", "Flintstone", "Miner", "fred@quary.com")));
		log.info("Preloading " + repository.save(new Employee("Barney", "Rubble", "Driver", "barney@quary.com")));
		log.info("Preloading " + repository.save(new Employee("Wilma", "Flintstone", "Chef", "wilma@quary.com")));
		log.info("Preloading " + repository.save(new Employee("Betty", "Rubble", "CEO", "betty@quary.com")));
	}
}