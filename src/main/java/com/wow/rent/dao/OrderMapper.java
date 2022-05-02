package com.wow.rent.dao;

import com.wow.rent.entry.OrderEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface OrderMapper {

    @Select("select * from zzz_order")
    List<OrderEntry> findAllOrders();

    @Select("select * from zzz_order where orderid = #{orderId}")
    OrderEntry findAllOrderById(int orderId);

    @Select("update zzz_order set endodo = #{endOdo} where orderid = #{orderId}")
    void updateEndOdo(int orderId, double endOdo);

}
