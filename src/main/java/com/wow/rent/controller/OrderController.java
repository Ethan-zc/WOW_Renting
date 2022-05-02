package com.wow.rent.controller;

import com.alibaba.fastjson.JSONObject;
import com.wow.rent.entry.IndiRegisterRequestEntry;
import com.wow.rent.entry.OrderEntry;
import com.wow.rent.entry.OrderUpdateRequestEntry;
import com.wow.rent.service.OrderService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/updateOrder", method = RequestMethod.POST)
    public Object updateEndOdo(@RequestBody OrderUpdateRequestEntry request) {
        JSONObject jsonObject = new JSONObject();
        int orderId;
        double endOdo;

        try {
            orderId = request.getOrderId();
            endOdo = request.getEndOdo();
        } catch (Exception e) {
            jsonObject.put("message", "Error in parsing variables");
            jsonObject.put("exception", e.toString());
            return jsonObject;
        }

        if (orderId < 0 || endOdo < 0) {
            jsonObject.put("message", "Error invalid variables");
            return jsonObject;
        }

        OrderEntry obj = orderService.findAllOrderById(orderId);
        if (obj == null) {
            jsonObject.put("message", String.format("Error no such order, orderId=%s", orderId));
            return jsonObject;
        }

        if (endOdo < obj.getStartOdo()) {
            jsonObject.put("message", "Error endOdo is less than startOdo");
            return jsonObject;
        }

        orderService.updateEndOdo(orderId, endOdo);
        jsonObject.put("message", "Success update table order");
        return jsonObject;
    }
}
