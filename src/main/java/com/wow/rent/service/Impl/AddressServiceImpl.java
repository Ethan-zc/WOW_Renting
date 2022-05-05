package com.wow.rent.service.Impl;

import com.wow.rent.dao.AddressMapper;
import com.wow.rent.entry.AddressEntry;
import com.wow.rent.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.websocket.OnError;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    protected AddressMapper addressMapper;

    @Override
    public List<AddressEntry> findAddressList() {
        return addressMapper.findAddressList();
    }

    @Override
    public int addAddr(String street, String state, String country, int zipcode) {
        AddressEntry addr = new AddressEntry();
        addr.setStreet(street);
        addr.setState(state);
        addr.setCountry(country);
        addr.setZipcode(zipcode);
        return addressMapper.add(addr);
    }

    @Override
    public int deleteAddr(int id) {
        return addressMapper.delete(id);
    }

    @Override
    public Integer findAddressIdByInfo(String street, String state, String country, int zipcode) {
        return addressMapper.findAddressIdByInfo(street, state, country, zipcode);
    }

    @Override
    public AddressEntry findAddressById(int addrId) {
        return addressMapper.findAddressById(addrId);
    }
}
