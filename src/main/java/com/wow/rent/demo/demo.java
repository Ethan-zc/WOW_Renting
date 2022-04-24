package com.wow.rent.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class demo {

    @RequestMapping("/")
    public String demo() {
        return "hello world";
    }
}
