package com.wow.rent.controller;

import com.alibaba.fastjson.JSONObject;
import com.wow.rent.entry.*;
import com.wow.rent.model.Result;
import com.wow.rent.service.AccountServie;
import com.wow.rent.service.OrderService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wow.rent.controller.AccountController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/order")
@Api(tags = "Order")
public class OrderController {

    public static final String SESSION_NAME = "userInfo";
    @Autowired
    private OrderService orderService;
    @Autowired
    private AccountServie accountServie;

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

    @RequestMapping(value = "/createOrder", method = RequestMethod.POST)
    public Result<OrderEntry> createOrder(@RequestBody OrderCreateRequestEntry orderRequest, HttpServletRequest httpRequest,
                                          HttpServletResponse response) {
        Result<OrderEntry> result = new Result<>();
        HttpSession session = httpRequest.getSession();
        // get user info from session
        AccountEntry sessionUser = (AccountEntry) session.getAttribute(SESSION_NAME);

        // if get null from session, is not logged.
        if (sessionUser == null) {
            result.setResultFailed("No login info！");
            return result;
        }
        // if logged, verify password using db info.
        AccountEntry getUser = null;
        try {
            getUser = accountServie.findAccountByAccName(sessionUser.getAccName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (getUser == null || !getUser.getPwd().equals(sessionUser.getPwd())) {
            result.setResultFailed("Account info error！");
            return result;
        }

        long custId = getUser.getCustId();
        String custType = getUser.getCustType();
        int startOdo;
        int odoLimit;
        Date startDate;
        Date endDate;
        int pickUp;
        int dropOff;
        int carId;
        String distType;
        int distId;

        try {
            startOdo = orderRequest.getStartOdo();
            odoLimit = orderRequest.getOdoLimit();
            startDate = orderRequest.getStartDate();
            endDate = orderRequest.getEndDate();
            pickUp = orderRequest.getPickUp();
            dropOff = orderRequest.getDropOff();
            carId = orderRequest.getCarId();
            distId = orderRequest.getDistId();
            distType = orderRequest.getDistType();
        } catch (Exception e) {
            result.setResultFailed("Parse Error!");
            return result;
        }

        Integer insert = orderService.createNewOrder(startOdo,odoLimit,
                startDate,endDate,custId,custType,pickUp,dropOff,carId,distType,distId);
        if (insert != null) {
            result.setResultSuccess("Success!", null);
        } else {
            result.setResultFailed("Failed!");
        }

        return result;
    }

}
