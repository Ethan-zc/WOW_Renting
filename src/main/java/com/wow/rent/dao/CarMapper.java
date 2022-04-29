package com.wow.rent.dao;

import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.VehicleEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CarMapper {

    @Select("SELECT * FROM zzz_car NATURAL JOIN zzz_office NATURAL JOIN zzz_address ORDER BY ${orderBy} DESC")
    List<CarEntry> findAllCars(String orderBy);

    @Select("select * from zzz_vehicle where vin = #{vin}")
    VehicleEntry getVehicleInfo(String vin);

    @Select("SELECT * FROM zzz_car NATURAL JOIN zzz_office NATURAL JOIN zzz_address WHERE state = #{pickup} ORDER BY ${orderby} DESC")
    List<CarEntry>findCarsWithPickUp(@Param("pickup") String pickup, @Param("orderby") String orderBy);

}
