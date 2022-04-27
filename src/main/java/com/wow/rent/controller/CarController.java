package com.wow.rent.controller;

import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.VehicleEntry;
import com.wow.rent.service.CarService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/cars")
@Api(tags = "Car")
public class CarController {

    @Autowired
    private CarService carService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<CarEntry> findAllCars(){
        return carService.findAllCars();
    }

    @RequestMapping(value = "/detailed", method = RequestMethod.GET)
    public VehicleEntry getDetailedInfo(@RequestParam(value = "vin")String vin) {
        return carService.getVehicleInfo(vin);
    }
}
