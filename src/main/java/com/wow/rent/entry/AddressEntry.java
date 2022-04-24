package com.wow.rent.entry;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressEntry {

    private int addrId;
    private String street;
    private String state;
    private String country;
    private int zipcode;
}
