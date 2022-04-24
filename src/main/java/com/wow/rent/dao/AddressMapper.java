package com.wow.rent.dao;

import com.wow.rent.entry.AddressEntry;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AddressMapper {

    @Select("select addrid, street, state, country, zipcode from zzz_address")
    List<AddressEntry> findAddressList();

    @Insert({"insert into zzz_address(addrid, street, state, country, zipcode) values('${addr.addrid}','${addr.street}','${addr.state}','${addr.country}', '${addr.zipcode}')"})
    int add(@Param("addr") AddressEntry addr);

    @Delete("delete from zzz_address where id = #{id}")
    int delete(int id);

}
