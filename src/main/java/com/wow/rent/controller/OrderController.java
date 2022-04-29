package com.wow.rent.controller;

import com.wow.rent.entry.OrderEntry;
import com.wow.rent.service.OrderService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/order")
@Api(tags = "Order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<OrderEntry> findAllOrders() {
        return orderService.findAllOrders();
    }
}
