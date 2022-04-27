package com.wow.rent.controller;

import com.wow.rent.entry.OfficeEntry;
import com.wow.rent.service.OfficeService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/office")
@Api(tags = "Office")
public class OfficeController {

    @Autowired
    private OfficeService officeService;

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public List<OfficeEntry> findOfficeList(){
        return officeService.findAllOffice();
    }

}
