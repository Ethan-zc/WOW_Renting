package com.wow.rent.dao;

import com.wow.rent.entry.OrderEntry;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.Date;
import java.util.List;

@Mapper
public interface OrderMapper {

    @Select("select * from zzz_order")
    List<OrderEntry> findAllOrders();

    @Select("select * from zzz_order where orderid = #{orderId}")
    OrderEntry findAllOrderById(int orderId);

    @Select("update zzz_order set endodo = #{endOdo} where orderid = #{orderId}")
    void updateEndOdo(int orderId, double endOdo);

    @Insert("INSERT INTO zzz_order (startodo, endodo, odolimit, startdate, enddate, custid, custtype, pickup, dropoff, carid, disctype, discid)" +
            " VALUES (#{startOdo}, null, #{odoLimit}, #{startDate}, #{endDate}, #{custId}, #{custType}, #{pickUp}, #{dropOff}, #{carId}, #{distType}, #{discId})")
    Integer createNewOrder(int startOdo,int odoLimit, Date startDate, Date endDate, long custId, String custType, int pickUp, int dropOff, int carId, String distType, int discId);

}
