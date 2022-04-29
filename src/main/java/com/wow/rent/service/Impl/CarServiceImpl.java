package com.wow.rent.service.Impl;

import com.wow.rent.dao.CarMapper;
import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.VehicleEntry;
import com.wow.rent.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.websocket.OnError;
import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    protected CarMapper carMapper;

    @Override
    public List<CarEntry> findAllCars(String orderBy) {
        return carMapper.findAllCars(orderBy);
    }

    @Override
    public VehicleEntry getVehicleInfo(String vin) {
        return carMapper.getVehicleInfo(vin);
    }

    @Override
    public List<CarEntry>findCarsWithPickUp(String pickup, String orderBy) {
        return carMapper.findCarsWithPickUp(pickup, orderBy);
    }

}
