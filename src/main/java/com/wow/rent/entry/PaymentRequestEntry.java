package com.wow.rent.entry;

import lombok.Data;

@Data
public class PaymentRequestEntry {

    private int invoiceId;
    private double amount;
    private String method;
    private String cardNum;

}
