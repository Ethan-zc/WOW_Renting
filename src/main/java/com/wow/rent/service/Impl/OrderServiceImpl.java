package com.wow.rent.service.Impl;

import com.wow.rent.dao.OrderMapper;
import com.wow.rent.entry.OrderEntry;
import com.wow.rent.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    protected OrderMapper orderMapper;

    @Override
    public List<OrderEntry> findAllOrders() {
        return orderMapper.findAllOrders();
    }

}
