package com.wow.rent.service.Impl;

import com.wow.rent.dao.CarMapper;
import com.wow.rent.entry.CarEntry;
import com.wow.rent.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    protected CarMapper carMapper;

    @Override
    public List<CarEntry> findAllCars() {
        return carMapper.findAllCars();
    }

}
