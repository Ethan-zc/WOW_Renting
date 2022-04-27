package com.wow.rent.dao;

import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.VehicleEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CarMapper {

    @Select("select * from zzz_car")
    List<CarEntry> findAllCars();

    @Select("select * from zzz_vehicle where vin = #{vin}")
    VehicleEntry getVehicleInfo(String vin);

}
