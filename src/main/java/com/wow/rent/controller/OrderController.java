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

import static com.wow.rent.controller.AccountController.SESSION_NAME;

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
    @Autowired
    private AccountController accountController;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Result<List<OrderEntry>> findAllOrders(HttpServletRequest request, HttpServletResponse response) {
        Result<List<OrderEntry>> result = new Result<>();
        // is login?
        if (!accountController.isLogin(request, response).isSuccess()) {
            result.setResultFailed("No login info！");
            return result;
        }

        // get user account name
        AccountEntry sessionUser = (AccountEntry) (request.getSession()).getAttribute(SESSION_NAME);
        String accName = sessionUser.getAccName();
        if (!accountServie.isAdmin(accName)) {
            result.setResultFailed("No Permission!");
            return result;
        }

        result.setResultSuccess("Success!", orderService.findAllOrders());
        return result;
    }

    @RequestMapping(value = "/custlist", method = RequestMethod.GET)
    public Result<List<OrderEntry>> findOrderByAccName(HttpServletRequest request, HttpServletResponse response) {
        Result<List<OrderEntry>> result = new Result<>();
        // is login?
        if (!accountController.isLogin(request, response).isSuccess()) {
            result.setResultFailed("No login info！");
            return result;
        }

        // get user account name
        AccountEntry sessionUser = (AccountEntry) (request.getSession()).getAttribute(SESSION_NAME);
        String accName = sessionUser.getAccName();
        AccountEntry account = accountServie.findAccountByAccName(accName);
        if (account == null) {
            result.setResultFailed("Account does not exist!");
            return result;
        }
        int custId = account.getCustId();
        List<OrderEntry> orderList = orderService.findOrderByCustId(custId);
        if (orderList == null) {
            result.setResultSuccess("empty", null);
            return result;
        }
        result.setResultSuccess("Success!", orderList);
        return result;

    }

    @RequestMapping(value = "/updateOrder", method = RequestMethod.PUT)
    public Object updateEndOdo(@RequestBody OrderUpdateRequestEntry request,
                               HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        JSONObject jsonObject = new JSONObject();
        int orderId;
        double endOdo;
        // is login?

        if (!accountController.isLogin(httpRequest, httpResponse).isSuccess()) {
            jsonObject.put("message", "No login info!");
            jsonObject.put("success", false);
            jsonObject.put("data", null);
            return jsonObject;
        }

        // get user account name
        AccountEntry sessionUser = (AccountEntry) (httpRequest.getSession()).getAttribute(SESSION_NAME);
        String accName = sessionUser.getAccName();

        if (!accountServie.isAdmin(accName)) {
            jsonObject.put("message", "No Permission!");
            jsonObject.put("success", false);
            jsonObject.put("data", null);
            return jsonObject;
        }

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
    public Result<OrderEntry> createOrder(@RequestBody OrderCreateRequestEntry orderRequest, HttpServletRequest httpRequest) {
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
        int startOdo = 0;
        int odoLimit = 100;
        Date startDate;
        Date endDate;
        int pickUp;
        int dropOff;
        int carId;
        String distNum;
        Integer distId = null;
        String distType = null;

        try {
            startDate = orderRequest.getStartDate();
            endDate = orderRequest.getEndDate();
            pickUp = orderRequest.getPickUp();
            dropOff = orderRequest.getDropOff();
            carId = orderRequest.getCarId();
            distNum = orderRequest.getDistNum();
        } catch (Exception e) {
            result.setResultFailed("Parse Error!");
            return result;
        }

        if (custType.equals("I") && !distNum.equals("")) {
            IndiDiscountEntry indiDiscount = orderService.findIndiDiscountByCoupNum(distNum);
            if (indiDiscount != null) {
                Date current = new Date();
                if (current.after(indiDiscount.getValidStart()) && current.before(indiDiscount.getValidEnd())) {
                    distId = indiDiscount.getDiscId();
                    distType = indiDiscount.getDiscType();
                } else {
                    result.setResultFailed("Discount not valid!");
                    return result;
                }
            } else {
                result.setResultFailed("Invalid Discount!");
                return result;
            }
        }


        if (custType.equals("C") && !distNum.equals("") ) {
            CorpDiscountEntry corpDiscount = orderService.findCorpDiscountBySetNum(distNum);
            if (corpDiscount != null) {
                distId = corpDiscount.getDiscId();
                distType = corpDiscount.getDiscType();
            } else {
                result.setResultFailed("Invalid Discount!");
                return result;
            }
        }

        if (orderService.findOrderByDiscount(distId, distType) != null && distId != null && distType != null) {
            result.setResultFailed("Discount has been used!");
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
