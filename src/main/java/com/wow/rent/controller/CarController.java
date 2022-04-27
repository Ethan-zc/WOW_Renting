package com.wow.rent.controller;

import com.wow.rent.entry.CarEntry;
import com.wow.rent.service.CarService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cars")
@Api(tags = "Testing car API: return all cars entry in zzz_car table")
public class CarController {

    @Autowired
    private CarService carService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<CarEntry> findAllCars(){
        return carService.findAllCars();
    }
}
