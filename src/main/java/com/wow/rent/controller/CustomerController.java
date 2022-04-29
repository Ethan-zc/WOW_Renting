package com.wow.rent.controller;

import com.wow.rent.service.AddressService;
import com.wow.rent.service.CustomerService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/customer")
@Api(tags = "Customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private AddressService addressService;

    @RequestMapping(value = "/addindi", method = RequestMethod.POST)
    public int addNewIndiCustomer(@RequestParam String custType,
                              @RequestParam String email,
                              @RequestParam String phone,
                              @RequestParam String street,
                              @RequestParam String state,
                              @RequestParam String country,
                              @RequestParam int zipcode,
                              @RequestParam String lName,
                              @RequestParam String fName,
                              @RequestParam String licenseNum,
                              @RequestParam String insName,
                              @RequestParam String insNum) {
//        System.out.println(street);
//        System.out.println(state);
//        System.out.println(country);
//        System.out.println(zipcode);
        // TODO: verify if email is used
        // TODO: verify if address is registered
        addressService.addAddr(street,state,country,zipcode);
        int addrId = addressService.findAddressIdByInfo(street, state, country, zipcode);
        customerService.addNewCustomer(custType, email, phone, addrId);
        int custId = customerService.findCustomerByInfo(custType, email, phone);
        return customerService.addIndividualCustomer(custId, lName, fName, licenseNum, insName, insNum);
    }

    @RequestMapping(value = "/addcorp", method = RequestMethod.POST)
    public int addNewCorpCustomer(@RequestParam String custType,
                                  @RequestParam String email,
                                  @RequestParam String phone,
                                  @RequestParam String street,
                                  @RequestParam String state,
                                  @RequestParam String country,
                                  @RequestParam int zipcode,
                                  @RequestParam String corpName,
                                  @RequestParam String regNum,
                                  @RequestParam String empId) {
//        System.out.println(street);
//        System.out.println(state);
//        System.out.println(country);
//        System.out.println(zipcode);
        // TODO: verify if email is used
        // TODO: verify if address is registered
        addressService.addAddr(street,state,country,zipcode);
        int addrId = addressService.findAddressIdByInfo(street, state, country, zipcode);
        customerService.addNewCustomer(custType, email, phone, addrId);
        int custId = customerService.findCustomerByInfo(custType, email, phone);
        return customerService.addCorpCustomer(custId, corpName, regNum, empId);
    }

}
