package com.wow.rent.service;

import com.wow.rent.entry.OrderEntry;
import org.springframework.stereotype.Service;

import java.util.List;

public interface OrderService {

    List<OrderEntry> findAllOrders();
}
