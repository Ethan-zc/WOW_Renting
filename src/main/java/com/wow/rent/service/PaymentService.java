package com.wow.rent.service;

import com.wow.rent.entry.PaymentEntry;

import java.util.List;

public interface PaymentService {

    PaymentEntry findPaymentListByInvoiceId(int invoiceId);
}
