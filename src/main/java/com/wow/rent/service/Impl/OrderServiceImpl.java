package com.wow.rent.service.Impl;

import com.wow.rent.dao.OrderMapper;
import com.wow.rent.entry.CorpDiscountEntry;
import com.wow.rent.entry.IndiDiscountEntry;
import com.wow.rent.entry.OrderEntry;
import com.wow.rent.service.OrderService;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
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
    public OrderEntry findOrderByDiscount(Integer discId, String discType) {
        return orderMapper.findOrderByDiscount(discId, discType);
    }

    @Override
    public List<OrderEntry> findOrderByCustId(int custId) {
        return orderMapper.findOrderByCustId(custId);
    }

    @Override
    public void updateEndOdo(int orderId, double endOdo) { orderMapper.updateEndOdo(orderId, endOdo); }

    @Override
    public Integer createNewOrder(int startOdo, int odoLimit, Date startDate, Date endDate, long custId, String custType,
                           int pickUp, int dropOff, int carId, String distType, Integer distId) {
        return orderMapper.createNewOrder(startOdo, odoLimit, startDate, endDate, custId, custType, pickUp, dropOff, carId, distType, distId);
    }

    @Override
    public IndiDiscountEntry findIndiDiscountByCoupNum(String couponNum) {
        return orderMapper.findIndiDiscountByCoupNum(couponNum);
    }

    @Override
    public CorpDiscountEntry findCorpDiscountBySetNum(String setNum) {
        return orderMapper.findCorpDiscountBySetNum(setNum);
    }
}
