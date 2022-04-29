package com.wow.rent.entry;

import lombok.Data;

@Data
public class TripRequestEntry {

    private String pickUp;
    private String pDate;
    private String dDate;
    private String orderBy;
}
