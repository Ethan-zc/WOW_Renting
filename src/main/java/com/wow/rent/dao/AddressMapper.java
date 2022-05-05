package com.wow.rent.dao;

import com.wow.rent.entry.AddressEntry;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AddressMapper {

    @Select("select addrid, street, state, country, zipcode from zzz_address")
    List<AddressEntry> findAddressList();

    @Insert({"insert into zzz_address(street, state, country, zipcode) values('${addr.street}','${addr.state}','${addr.country}', '${addr.zipcode}')"})
    int add(@Param("addr") AddressEntry addr);

    @Delete("delete from zzz_address where id = #{id}")
    int delete(int id);

    @Select("SELECT addrid FROM zzz_address WHERE street = #{street} AND state = #{state} AND country = #{country} AND zipcode = #{zipcode}")
    Integer findAddressIdByInfo(String street, String state, String country, int zipcode);

    @Select("SELECT * FROM zzz_address WHERE addrid = #{addrId}")
    AddressEntry findAddressById(int addrId);

}
