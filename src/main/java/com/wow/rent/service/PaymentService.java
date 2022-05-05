package com.wow.rent.service;

import com.wow.rent.entry.PaymentEntry;

import java.util.Date;
import java.util.List;

public interface PaymentService {

    PaymentEntry findPaymentListByInvoiceId(int invoiceId);

    void createNewPayment(String method, double amount, Date paymDate, String cardNum, int invoiceId);
}
