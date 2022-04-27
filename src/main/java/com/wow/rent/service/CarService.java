package com.wow.rent.service;

import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.VehicleEntry;

import java.util.List;

public interface CarService {

    List<CarEntry> findAllCars();

    VehicleEntry getVehicleInfo(String vin);
}
