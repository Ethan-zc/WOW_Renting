package com.wow.rent.dao;

import com.wow.rent.entry.CarEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CarMapper {

    @Select("select * from zzz_car")
    List<CarEntry> findAllCars();
}
