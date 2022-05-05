package com.wow.rent.entry;

import lombok.Data;

import java.util.Date;

@Data
public class InvoiceEntry {

    private int invoiceId;
    private Date invoiceDate;
    private double amount;
    private double remain;
    private String isPaid;
    private int orderId;
}
