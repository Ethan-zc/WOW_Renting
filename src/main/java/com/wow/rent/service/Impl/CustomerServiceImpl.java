package com.wow.rent.service.Impl;

import com.wow.rent.dao.AddressMapper;
import com.wow.rent.dao.CustomerMapper;
import com.wow.rent.entry.CustomerEntry;
import com.wow.rent.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    protected CustomerMapper customerMapper;

    @Override
    public CustomerEntry findCustomerById(long custId) {
        return customerMapper.findCustomerById(custId);
    }

    @Override
    public int addNewCustomer(String custType, String email, String phone, int addrId) {
        return customerMapper.addCustomer(custType, email, phone, addrId);
    }

    @Override
    public Integer findCustomerByInfo(String custType, String email, String phone) {
        return customerMapper.findCustomerByInfo(custType, email, phone);
    }

    @Override
    public Integer findCustomerIdByEmail(String email) {
        return customerMapper.findCustomerByEmail(email);
    }

    @Override
    public int addIndividualCustomer(long custId, String lName, String fName, String licenseNum, String insName, String insNum) {
        return customerMapper.addIndividualCustomer(custId, "I", lName, fName, licenseNum, insName, insNum);
    }

    @Override
    public int addCorpCustomer(long custId, String corpName, String regNum, String empId) {
        return customerMapper.addCorpCustomer(custId, "C", corpName, regNum, empId);
    }
}
