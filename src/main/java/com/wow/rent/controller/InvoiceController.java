package com.wow.rent.controller;

import com.wow.rent.entry.AccountEntry;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

import static com.wow.rent.controller.AccountController.SESSION_NAME;

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
    @Autowired
    AccountController accountController;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Result<List<InvoiceEntry>> getInvoiceList(HttpServletRequest request, HttpServletResponse response) {
        Result<List<InvoiceEntry>> result = new Result<>();
        // is login?
        if (!accountController.isLogin(request, response).isSuccess()) {
            result.setResultFailed("No login info！");
            return result;
        }

        // get user account name
        AccountEntry sessionUser = (AccountEntry) (request.getSession()).getAttribute(SESSION_NAME);
        String accName = sessionUser.getAccName();
        return invoiceService.findInvoiceListByAccName(accName);
    }

}
