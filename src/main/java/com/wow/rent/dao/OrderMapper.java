package com.wow.rent.dao;

import com.wow.rent.entry.OrderEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OrderMapper {

    @Select("select * from zzz_order")
    List<OrderEntry> findAllOrders();

}
