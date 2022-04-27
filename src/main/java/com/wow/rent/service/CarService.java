package com.wow.rent.service;

import com.wow.rent.entry.CarEntry;

import java.util.List;

public interface CarService {

    List<CarEntry> findAllCars();
}
