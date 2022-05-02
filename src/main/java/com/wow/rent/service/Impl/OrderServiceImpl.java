package com.wow.rent.service.Impl;

import com.wow.rent.dao.OrderMapper;
import com.wow.rent.entry.OrderEntry;
import com.wow.rent.service.OrderService;
import org.apache.ibatis.annotations.Select;
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

    @Override
    public OrderEntry findAllOrderById(int orderId) {
        return orderMapper.findAllOrderById(orderId);
    }

    @Override
    public void updateEndOdo(int orderId, double endOdo) { orderMapper.updateEndOdo(orderId, endOdo); }
}
