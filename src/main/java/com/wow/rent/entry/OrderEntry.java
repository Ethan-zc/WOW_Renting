package com.wow.rent.entry;

import lombok.Data;

@Data
public class OrderEntry {

    private int orderId;
    private long startOdo;
    private long endOdo;
    private long odoLimit;
    private String startDate;
    private String endDate;
    private String custId;
    private int pickUp;
    private int dropOff;
    private int carId;
    private String discType;
    private int discId;
}
