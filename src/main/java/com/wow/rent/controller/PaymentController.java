package com.wow.rent.controller;

import com.wow.rent.entry.InvoiceEntry;
import com.wow.rent.entry.PaymentEntry;
import com.wow.rent.entry.PaymentRequestEntry;
import com.wow.rent.model.Result;
import com.wow.rent.service.AccountServie;
import com.wow.rent.service.InvoiceService;
import com.wow.rent.service.PaymentService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
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
        if(paymentList.isEmpty()) {
            result.setResultSuccess("empty", paymentList);
            return result;
        }
        result.setResultSuccess("Success!", paymentList);
        return result;

    }

    @RequestMapping(value = "/pay", method = RequestMethod.POST)
    public Result<String> makePayment(@RequestBody PaymentRequestEntry paymentRequest) {
        Result<String> result = new Result<>();
        InvoiceEntry invoice = invoiceService.findInvoiceByInvoiceId(paymentRequest.getInvoiceId());
        double payAmount = paymentRequest.getAmount();
        if (payAmount <= 0 || payAmount > invoice.getRemain() || invoice.getIsPaid().equals("Y")) {
            result.setResultFailed("Invalid Payment!");
            return result;
        }

        double remain = invoice.getRemain();
        double remainAfterPay = remain - payAmount;
        invoiceService.updateRemainByInvoiceId(invoice.getInvoiceId(), remainAfterPay);
        Date current = new Date();
        String method = paymentRequest.getMethod();
        String cardNum = paymentRequest.getCardNum();
        paymentService.createNewPayment(method, payAmount, current, cardNum, invoice.getInvoiceId());
        result.setResultSuccess("Success!", null);
        return result;

    }


}
