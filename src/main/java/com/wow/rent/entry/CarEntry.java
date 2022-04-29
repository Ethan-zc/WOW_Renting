package com.wow.rent.entry;

import lombok.Data;

@Data
public class CarEntry {

    private int carId;
    private int officeId;
    private String carType;
    private double dailyRate;
    private double overRate;
    private String vin;
    private String imgUrl;
    private String phone;
    private int addrId;
    private String street;
    private String state;
    private String country;
    private String zipcode;

}
