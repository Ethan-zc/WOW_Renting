package com.wow.rent;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@Configuration
@EnableOpenApi
@Profile({"dev", "test"})
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.wow.rent.controller"))// scanner path
                .paths(PathSelectors.any())
                .build();
    }

    // Config Info
    private ApiInfo apiInfo() {
        Contact contact = new Contact("ZZZ", "www.meta.com", "123@gmail.com");
        return new ApiInfo(
                "WOW Renting", // Title
                "Final Project for DB", // Description
                "v1.0", // Version
                "https://github.com/Ethan-zc/WOW_Renting", // Link
                contact, // Contactor
                "Apach 2.0 Permission", // Permission
                "www.google.com", // Link
                new ArrayList<>()// plugins
        );
    }
}
