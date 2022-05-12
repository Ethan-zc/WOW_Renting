package com.wow.rent.controller;

import com.wow.rent.entry.AccountEntry;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.wow.rent.controller.AccountController.SESSION_NAME;

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
    @Autowired
    AccountController accountController;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Result<List<PaymentEntry>> getPaymentList(HttpServletRequest request, HttpServletResponse response) {
        Result<List<PaymentEntry>> result = new Result<>();

        if (!accountController.isLogin(request, response).isSuccess()) {
            result.setResultFailed("No login info！");
            return result;
        }

        // get user account name
        AccountEntry sessionUser = (AccountEntry) (request.getSession()).getAttribute(SESSION_NAME);
        String accName = sessionUser.getAccName();

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
        List<PaymentEntry> temp = new ArrayList<>();
        for (InvoiceEntry invoice : invoiceList) {
            int invoiceId = invoice.getInvoiceId();
            temp = paymentService.findPaymentListByInvoiceId(invoiceId);
            if (temp != null && !temp.isEmpty()) {
                paymentList.addAll(temp);
            }
            temp = new ArrayList<>();
        }
        if(paymentList.isEmpty()) {
            result.setResultSuccess("empty", paymentList);
            return result;
        }
        result.setResultSuccess("Success!", paymentList);
        return result;

    }

    @RequestMapping(value = "/pay", method = RequestMethod.POST)
    public Result<String> makePayment(@RequestBody PaymentRequestEntry paymentRequest,
                                      HttpServletRequest request, HttpServletResponse response) {
        Result<String> result = new Result<>();

        if (!accountController.isLogin(request, response).isSuccess()) {
            result.setResultFailed("No login info！");
            return result;
        }

        // get user account name
        AccountEntry sessionUser = (AccountEntry) (request.getSession()).getAttribute(SESSION_NAME);

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
