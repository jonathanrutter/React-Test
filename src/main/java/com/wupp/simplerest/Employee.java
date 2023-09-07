package com.wupp.simplerest;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Version;

@Entity
class Employee {

	private @Id @GeneratedValue Long id;
	private String firstName;
	private String lastName;
	private String role;
	private String email;

	private @Version @JsonIgnore Long version;
	
	public Employee() {
	}

	Employee(String firstName, String lastName, String role, String email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.setEmail(email);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(email, firstName, id, lastName, role, version);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Employee other = (Employee) obj;
		return Objects.equals(email, other.email) && Objects.equals(firstName, other.firstName)
				&& Objects.equals(id, other.id) && Objects.equals(lastName, other.lastName)
				&& Objects.equals(role, other.role) &&
				Objects.equals(version, other.version);
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", role=" + role
				+ ", email=" + email + ", version=" + version + "]";
	}


}