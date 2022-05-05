package com.wow.rent.service;

import com.wow.rent.entry.AddressEntry;

import java.util.List;

public interface AddressService {

    List<AddressEntry> findAddressList();

    int addAddr(String street,String state,String country, int zipcode);

    int deleteAddr(int id);

    Integer findAddressIdByInfo(String street, String state, String country, int zipcode);

    AddressEntry findAddressById(int addrId);
}

