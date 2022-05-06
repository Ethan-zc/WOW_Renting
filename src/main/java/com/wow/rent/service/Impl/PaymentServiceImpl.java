package com.wow.rent.service.Impl;

import com.wow.rent.dao.PaymentMapper;
import com.wow.rent.entry.PaymentEntry;
import com.wow.rent.service.PaymentService;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    PaymentMapper paymentMapper;

    @Override
    public List<PaymentEntry> findPaymentListByInvoiceId(int invoiceId) {
        return paymentMapper.findPaymentByInvoiceId(invoiceId);
    }

    @Override
    public void createNewPayment(String method, double amount, Date paymDate, String cardNum, int invoiceId) {
        paymentMapper.createNewPayment(method, amount, paymDate, cardNum, invoiceId);
    }


}
