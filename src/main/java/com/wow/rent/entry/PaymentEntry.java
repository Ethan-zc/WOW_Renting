package com.wow.rent.entry;

import lombok.Data;

import java.util.Date;

@Data
public class PaymentEntry {

    private int paymId;
    private String method;
    private double amount;
    private Date paymDate;
    private String cardNum;
    private int invoiceId;
}
