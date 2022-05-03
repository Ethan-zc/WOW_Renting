package com.wow.rent.entry;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class OrderCreateRequestEntry {

    private int startOdo;
    private int odoLimit;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    private int pickUp;
    private int dropOff;
    private int carId;
    private String distType;
    private int distId;

}
