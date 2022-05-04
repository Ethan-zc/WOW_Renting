package com.wow.rent.controller;

import com.wow.rent.entry.InvoiceEntry;
import com.wow.rent.entry.OrderEntry;
import com.wow.rent.model.Result;
import com.wow.rent.service.AccountServie;
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
    AccountServie accountServie;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Result<List<InvoiceEntry>> getInvoiceList(@RequestParam(value = "accName")String accName) {
        return invoiceService.findInvoiceListByAccName(accName);
    }

}
