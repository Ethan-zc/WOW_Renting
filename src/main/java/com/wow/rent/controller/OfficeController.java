package com.wow.rent.controller;

import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.OfficeEntry;
import com.wow.rent.service.OfficeService;
import io.swagger.annotations.Api;
import net.dreamlu.mica.xss.core.XssCleanIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/office")
@Api(tags = "Office")
//@XssCleanIgnore
public class OfficeController {

    @Autowired
    private OfficeService officeService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<OfficeEntry> findOfficeList(){
        return officeService.findAllOffice();
    }

    @RequestMapping(value = "/carlist", method = RequestMethod.GET)
    public List<CarEntry> findCarList(@RequestParam(value = "officeid") int officeId){
        return officeService.findCarList(officeId);
    }

    @GetMapping("/xss")
    public String xssGet(String data){
        System.out.println(data);
        return data;
    }

    @PostMapping("/xss")
    public String xssPost(String data){
        System.out.println(data);
        return data;
    }

}
