package com.wow.rent.controller;

import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.OfficeEntry;
import com.wow.rent.service.OfficeService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/office")
@Api(tags = "Office")
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

}
