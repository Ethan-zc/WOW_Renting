package com.wow.rent.service.Impl;

import com.wow.rent.dao.AddressMapper;
import com.wow.rent.entry.AddressEntry;
import com.wow.rent.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public int addAddr(int addrid, String street, String state, String country, int zipcode) {
        AddressEntry addr = new AddressEntry();
        addr.setAddrId(addrid);
        addr.setStreet(street);
        addr.setState(state);
        addr.setZipcode(zipcode);
        return addressMapper.add(addr);
    }

    @Override
    public int deleteAddr(int id) {
        return deleteAddr(id);
    }
}
