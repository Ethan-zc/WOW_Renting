package com.wow.rent.controller;

import com.wow.rent.entry.InvoiceEntry;
import com.wow.rent.entry.OrderEntry;
import com.wow.rent.model.Result;
import com.wow.rent.service.CustomerService;
import com.wow.rent.service.InvoiceService;
import com.wow.rent.service.OrderService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/invoice")
@Api(tags = "Invoice")
public class InvoiceController {

    @Autowired
    InvoiceService invoiceService;
    @Autowired
    OrderService orderService;
    @Autowired
    CustomerService customerService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Result<List<InvoiceEntry>> getInvoiceList(@RequestParam(value = "custId")int custId) {
        Result<List<InvoiceEntry>> result = new Result<>();

        if (customerService.findCustomerById(custId) == null) {
            result.setResultFailed("Customer does not exist!");
            return result;
        }

        List<OrderEntry> orderList = orderService.findOrderByCustId(custId);
        List<InvoiceEntry> invoiceList = new ArrayList<>();
        for (OrderEntry order : orderList) {
            InvoiceEntry invoice = invoiceService.findInvoiceByOrderId(order.getOrderId());
            if (invoice != null) {
                invoiceList.add(invoice);
            }
        }
        if (invoiceList.isEmpty()) {
            result.setResultFailed("empty");
            return result;
        }
        result.setResultSuccess("Success!", invoiceList);
        return result;
    }

}
