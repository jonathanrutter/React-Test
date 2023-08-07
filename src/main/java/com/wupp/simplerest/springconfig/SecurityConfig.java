package com.wupp.simplerest.springconfig;

import static org.springframework.security.config.Customizer.withDefaults;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter.ReferrerPolicy;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter.HeaderValue;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig
{
	public static final String CSP_POLICY = "default-src 'self'; "
			+ "frame-src 'self' blob: ; "
			+ "connect-src 'self'; "
			+ "font-src 'self' https://use.fontawesome.com https://fonts.gstatic.com https://stackpath.bootstrapcdn.com 'unsafe-inline'; "
			+ "script-src 'self' https://cdn.jsdelivr.net https://unpkg.com https://stackpath.bootstrapcdn.com https://ajax.googleapis.com/ https://cdn.datatables.net 'unsafe-inline'; "
			+ "style-src 'self' https://fonts.googleapis.com https://stackpath.bootstrapcdn.com https://use.fontawesome.com https://cdn.datatables.net https://cdn.jsdelivr.net 'unsafe-inline'; "
			+ "img-src 'self' data;"
			+ "object-src 'self' blob:";

	@Bean
	public UserDetailsService userDetailsService() {

		UserDetails user = User.withUsername("user")
				.password(getPasswordEncoder().encode("password"))
				.roles("USER")
				.build();
		
		UserDetails admin = User.withUsername("admin")
				.password(getPasswordEncoder().encode("admin"))
				.roles("ADMIN")
				.build();

		return new InMemoryUserDetailsManager(user, admin);
	}

	public PasswordEncoder getPasswordEncoder(){
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
	
	@Bean
	protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(authorizeRequests ->
				authorizeRequests
					.requestMatchers(
						"/ajax"
							).authenticated()
					.requestMatchers(
						"/addEmployee"
							).hasAnyAuthority("ADMIN")
					.requestMatchers(
						"/favicon.ico",
						"/robots.txt",
						"/images/**",
						"/styles/**", 
						"/Javascript/**",
						"/login",
						"/forgotPassword",
						"/rest/LoginResource/*"
							).permitAll()
//					.requestMatchers("/login").anonymous() // could give 403 error if user already logged in?
					.requestMatchers("/**").permitAll()
					.requestMatchers(HttpMethod.HEAD).denyAll()
					.requestMatchers(HttpMethod.OPTIONS).denyAll()
					.requestMatchers(HttpMethod.PATCH).denyAll()
					.requestMatchers(HttpMethod.TRACE).denyAll()
					.anyRequest().denyAll()
				)
			
			.formLogin(formLogin -> formLogin
					.loginPage("/login")
					.permitAll()
			)
			.logout(logout -> logout
					.permitAll()
			)

			.rememberMe(rememberMe -> rememberMe
					.disable()
			)
//			.exceptionHandling(configurer ->
//				configurer
//					.defaultAuthenticationEntryPointFor(new LoginUrlAuthenticationEntryPoint("/login"), 
//						new AntPathRequestMatcher(".*/login*"))
//				)
		
			.csrf(csrf ->
				csrf
					.disable() //enabled by default
				)
			
			.headers(headers -> 
				headers
					.defaultsDisabled()
					.contentTypeOptions(withDefaults())
					.frameOptions(foconf -> 
						foconf
							.sameOrigin()
						)
					.contentSecurityPolicy(contentSecurityPolicy ->
						contentSecurityPolicy
							.policyDirectives(CSP_POLICY)
						)
					.xssProtection(xsscust -> 
						xsscust
							.headerValue(HeaderValue.ENABLED_MODE_BLOCK)
						)
					.cacheControl(withDefaults())
					.httpStrictTransportSecurity(hstscust -> 
						hstscust
							.includeSubDomains(true)
							.maxAgeInSeconds(31536000)
						)
					.referrerPolicy(Customizer.withDefaults())
				)

			.logout(logoutConfigurer ->
				logoutConfigurer
					.logoutUrl("/logout")
					.deleteCookies("JSESSIONID")
					.clearAuthentication(true)
					.logoutSuccessUrl("/login?logout")
					.invalidateHttpSession(true)
					.permitAll()
				)
					
			.sessionManagement(sessionManagementConfigurer ->
				sessionManagementConfigurer
					.enableSessionUrlRewriting(false)
					.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
					.maximumSessions(1) // FIXME not sure how this is meant to work
//					.expiredUrl("/logout?login")
				);
		
		return http.build();

	}
}