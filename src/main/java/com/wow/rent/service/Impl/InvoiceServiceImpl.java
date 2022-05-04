package com.wow.rent.service.Impl;

import com.wow.rent.dao.InvoiceMapper;
import com.wow.rent.entry.InvoiceEntry;
import com.wow.rent.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    InvoiceMapper invoiceMapper;

    @Override
    public InvoiceEntry findInvoiceByOrderId(int orderId) {
        return invoiceMapper.findInvoiceByOrderId(orderId);
    }
}
