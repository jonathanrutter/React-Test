package com.wupp.simplerest;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
class CustomExceptionHandler {
	private static final Logger log = LoggerFactory.getLogger(CustomExceptionHandler.class);

	@ResponseBody
	@ExceptionHandler(EmployeeNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String employeeNotFoundHandler(EmployeeNotFoundException ex) {
		return ex.getMessage() + "Employee Not Found";
	}


	/**
	 * This catches 404 page not found exceptions and sends them all to the start page.
	 * This is a catch-all for using React Routing where the client side tries to handle
	 * the parts of the URL that are intended to be handled by the React Routing. This
	 * can be caused by refreshing a page in the browser when not on the start page.
	 *
	 * @param e exception from MVC Controller
	 * @return the view name
	 */
	@ExceptionHandler(NoResourceFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String notFoundHandler(HttpServletRequest request, NoResourceFoundException e) {
		log.warn("A 404 error so redirecting to the main page: {} with error message: {}",
				request.getRequestURI(), e.getMessage());
		return "index";
	}

}