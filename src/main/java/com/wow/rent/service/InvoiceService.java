package com.wow.rent.service;

import com.wow.rent.entry.InvoiceEntry;
import com.wow.rent.model.Result;

import java.util.List;

public interface InvoiceService {

    InvoiceEntry findInvoiceByOrderId(int orderId);

    Result<List<InvoiceEntry>> findInvoiceListByAccName(String accName);

    InvoiceEntry findInvoiceByInvoiceId(int invoiceId);

    void updateRemainByInvoiceId(int invoiceId, double remain);
}
