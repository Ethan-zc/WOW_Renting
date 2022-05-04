package com.wow.rent.service.Impl;

import com.wow.rent.dao.PaymentMapper;
import com.wow.rent.entry.PaymentEntry;
import com.wow.rent.service.PaymentService;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    PaymentMapper paymentMapper;

    @Override
    public PaymentEntry findPaymentListByInvoiceId(int invoiceId) {
        return paymentMapper.findPaymentByInvoiceId(invoiceId);
    }


}
