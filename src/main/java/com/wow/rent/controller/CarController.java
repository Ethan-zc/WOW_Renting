package com.wow.rent.controller;

import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.TripRequestEntry;
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

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public List<CarEntry> findCars(@RequestBody TripRequestEntry tripRequest){
//        TODO: filter by pdate and ddate.
        if (tripRequest.getOrderBy().equals("") || tripRequest.getOrderBy() == null) {
            tripRequest.setOrderBy("dailyrate");
        }
        if (tripRequest.getPickUp().equals("") || tripRequest.getPickUp() == null) {
            return carService.findAllCars(tripRequest.getOrderBy());
        }
        String state = tripRequest.getPickUp();
        String orderBy = tripRequest.getOrderBy();
        List<CarEntry> testing = carService.findCarsWithPickUp(state, orderBy);

        System.out.println(testing);
        return carService.findCarsWithPickUp(state, orderBy);
    }

    @RequestMapping(value = "/detailed", method = RequestMethod.GET)
    public VehicleEntry getDetailedInfo(@RequestParam(value = "vin")String vin) {
        return carService.getVehicleInfo(vin);
    }
}
