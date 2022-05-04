package com.wow.rent.service.Impl;

import com.wow.rent.dao.InvoiceMapper;
import com.wow.rent.entry.InvoiceEntry;
import com.wow.rent.entry.OrderEntry;
import com.wow.rent.model.Result;
import com.wow.rent.service.AccountServie;
import com.wow.rent.service.InvoiceService;
import com.wow.rent.service.OfficeService;
import com.wow.rent.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    InvoiceMapper invoiceMapper;
    @Autowired
    AccountServie accountServie;
    @Autowired
    OrderService orderService;

    @Override
    public InvoiceEntry findInvoiceByOrderId(int orderId) {
        return invoiceMapper.findInvoiceByOrderId(orderId);
    }

    @Override
    public Result<List<InvoiceEntry>> findInvoiceListByAccName(String accName) {
        Result<List<InvoiceEntry>> result = new Result<>();
        if (accountServie.findAccountByAccName(accName) == null) {
            result.setResultFailed("Account does not exist!");
            return result;
        }
        int custId = accountServie.findAccountByAccName(accName).getCustId();
        List<OrderEntry> orderList = orderService.findOrderByCustId(custId);
        List<InvoiceEntry> invoiceList = new ArrayList<>();
        for (OrderEntry order : orderList) {
            InvoiceEntry invoice = findInvoiceByOrderId(order.getOrderId());
            if (invoice != null) {
                invoiceList.add(invoice);
            }
        }
        if (invoiceList.isEmpty()) {
            result.setResultSuccess("empty", null);
            return result;
        }
        result.setResultSuccess("Success!", invoiceList);
        return result;
    }
}
