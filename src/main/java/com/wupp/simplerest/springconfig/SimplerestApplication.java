package com.wupp.simplerest.springconfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableAutoConfiguration
@ComponentScan(basePackages={"com.wupp.simplerest"})
@EnableJpaRepositories(basePackages="com.wupp.simplerest")
@EnableTransactionManagement
@EntityScan(basePackages="com.wupp.simplerest")
@SpringBootApplication(exclude = { 
		SecurityAutoConfiguration.class
})
public class SimplerestApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimplerestApplication.class, args);
	}

}
