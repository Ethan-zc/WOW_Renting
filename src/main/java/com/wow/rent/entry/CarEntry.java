package com.wow.rent.entry;

import lombok.Data;

@Data
public class CarEntry {

    private int carId;
    private String carType;
    private double dailyRate;
    private double overRate;
    private int officeId;
    private String vin;
    private String imgUrl;
}
