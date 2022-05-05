package com.wow.rent.controller;

import com.wow.rent.entry.InvoiceEntry;
import com.wow.rent.entry.PaymentEntry;
import com.wow.rent.model.Result;
import com.wow.rent.service.AccountServie;
import com.wow.rent.service.InvoiceService;
import com.wow.rent.service.PaymentService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/payment")
@Api(tags = "Payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;
    @Autowired
    AccountServie accountServie;
    @Autowired
    InvoiceService invoiceService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Result<List<PaymentEntry>> getPaymentList(@RequestParam(value = "accName")String accName) {
        Result<List<PaymentEntry>> result = new Result<>();
        if (accountServie.findAccountByAccName(accName) == null) {
            result.setResultFailed("Account does not exist!");
            return result;
        }
        Result<List<InvoiceEntry>> invoiceResult = invoiceService.findInvoiceListByAccName(accName);
        List<InvoiceEntry> invoiceList = invoiceResult.getData();
        if (invoiceResult.getData() == null) {
            result.setResultSuccess("empty", null);
            return result;
        }

        List<PaymentEntry> paymentList = new ArrayList<>();
        for (InvoiceEntry invoice : invoiceList) {
            int invoiceId = invoice.getInvoiceId();
            PaymentEntry payment = paymentService.findPaymentListByInvoiceId(invoiceId);
            paymentList.add(payment);
        }
        result.setResultSuccess("Success!", paymentList);
        return result;

    }


}
