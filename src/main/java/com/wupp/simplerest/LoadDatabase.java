package com.wupp.simplerest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
class DatabaseLoader implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(DatabaseLoader.class);

	@Autowired
	private EmployeeRepository repository;
	
	public DatabaseLoader() {
		
	}
	
	@Override
	public void run(String... args) throws Exception {
		log.info("Preloading " + repository.save(new Employee("Fred", "Flintstone", "Miner", "fred@quary.com")));
		log.info("Preloading " + repository.save(new Employee("Barney", "Rubble", "CEO", "barney@quary.com")));
	}
}