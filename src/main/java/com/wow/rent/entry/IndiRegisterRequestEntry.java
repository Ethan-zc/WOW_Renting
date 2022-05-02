package com.wow.rent.entry;

import lombok.Data;

@Data
public class IndiRegisterRequestEntry {

    private String accname;
    private String pwd;
    private String email;
    private String phone;
    private String street;
    private String state;
    private String country;
    private int zipcode;
    private String lname;
    private String fname;
    private int licensenum;
    private String insname;
    private int insnum;

}
