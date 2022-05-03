package com.wow.rent.service;

import com.wow.rent.entry.OrderEntry;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

public interface OrderService {

    List<OrderEntry> findAllOrders();

    OrderEntry findAllOrderById(int orderId);

    void updateEndOdo(int orderId, double endOdo);

    Integer createNewOrder(int startOdo, int odoLimit, Date startDate, Date endDate, long custId, String custType,
                           int pickUp, int dropOff, int carId, String distType, int distId);
}
