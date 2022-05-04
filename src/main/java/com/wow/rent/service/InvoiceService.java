package com.wow.rent.service;

import com.wow.rent.entry.InvoiceEntry;

import java.util.List;

public interface InvoiceService {

    InvoiceEntry findInvoiceByOrderId(int orderId);
}
