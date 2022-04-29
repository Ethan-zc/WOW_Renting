package com.wow.rent.entry;

import lombok.Data;

@Data
public class CorpRegisterRequestEntry {

    private String accname;
    private String pwd;
    private String email;
    private String phone;
    private String street;
    private String state;
    private String country;
    private String zipcode;
    private String corpname;
    private String regnum;
    private String empid;
}
