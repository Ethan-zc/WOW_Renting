package com.wow.rent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan(basePackages = "com.wow.rent.config.SqlFilter")
public class WowRentingApplication {

	public static void main(String[] args) {
		SpringApplication.run(WowRentingApplication.class, args);
	}

}
