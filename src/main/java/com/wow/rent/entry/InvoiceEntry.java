package com.wow.rent.entry;

import lombok.Data;

import java.util.Date;

@Data
public class InvoiceEntry {

    private int invoiceId;
    private Date invoiceDate;
    private int amount;
    private String isPaid;
    private int orderId;
}
