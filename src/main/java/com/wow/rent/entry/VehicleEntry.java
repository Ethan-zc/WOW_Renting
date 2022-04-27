package com.wow.rent.entry;

import lombok.Data;

@Data
public class VehicleEntry {

    private String vin;
    private String make;
    private String model;
    private String year;
    private String lpn;
}
