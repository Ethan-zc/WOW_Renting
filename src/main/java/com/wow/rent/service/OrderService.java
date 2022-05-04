package com.wow.rent.service;

import com.wow.rent.entry.CorpDiscountEntry;
import com.wow.rent.entry.IndiDiscountEntry;
import com.wow.rent.entry.OrderEntry;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

public interface OrderService {

    List<OrderEntry> findAllOrders();

    OrderEntry findAllOrderById(int orderId);

    OrderEntry findOrderByDiscount(Integer discId, String discType);

    void updateEndOdo(int orderId, double endOdo);

    Integer createNewOrder(int startOdo, int odoLimit, Date startDate, Date endDate, long custId, String custType,
                           int pickUp, int dropOff, int carId, String distType, Integer distId);

    IndiDiscountEntry findIndiDiscountByCoupNum(String couponNum);

    CorpDiscountEntry findCorpDiscountBySetNum(String setNum);


}
