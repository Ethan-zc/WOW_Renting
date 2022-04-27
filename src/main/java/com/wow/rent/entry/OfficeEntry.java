package com.wow.rent.entry;

import lombok.Data;

@Data
public class OfficeEntry {

    private int officeId;
    private int addrId;
    private String phone;
    private String street;
    private String state;
    private String country;
    private String zipcode;
}
