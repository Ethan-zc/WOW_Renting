package com.wow.rent.entry;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;

@Data
public class OrderCreateRequestEntry {

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    private int pickUp;
    private int dropOff;
    private int carId;
    private String distNum;

    private String accName;

}
