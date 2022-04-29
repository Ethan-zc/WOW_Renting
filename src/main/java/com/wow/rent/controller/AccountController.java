package com.wow.rent.controller;

import com.alibaba.fastjson.JSONObject;
import com.wow.rent.entry.CorpRegisterRequestEntry;
import com.wow.rent.entry.IndiRegisterRequestEntry;
import com.wow.rent.service.AccountServie;
import com.wow.rent.service.AddressService;
import com.wow.rent.service.CustomerService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/account")
@Api(tags = "Account")
public class AccountController {

    @Autowired
    private AccountServie accountServie;
    @Autowired
    private AddressService addressService;
    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/indi/register", method = RequestMethod.POST)
    public Object indiRegister(@RequestBody IndiRegisterRequestEntry request) {
        String accName = request.getAccname();
        String pwd = request.getPwd();
        JSONObject jsonObject = new JSONObject();
        if (accName == null || pwd == null || accName.equals("") || pwd.equals("")) {
            jsonObject.put("message","Account Name or password could not be empty. ");
            return jsonObject;
        } else {
            if (accountServie.findAccountByAccName(accName) != null) {
                jsonObject.put("message","Account Name has been used. ");
                return jsonObject;
            }
            String street = request.getStreet();
            String state = request.getState();
            String country = request.getCountry();
            int zipcode = Integer.parseInt(request.getZipcode());
            addressService.addAddr(street,state,country,zipcode);
            int addrId = addressService.findAddressIdByInfo(street, state, country, zipcode);
            String custType = "I";
            String email = request.getEmail();
            String phone = request.getPhone();
            customerService.addNewCustomer(custType, email, phone, addrId);
            int custId = customerService.findCustomerByInfo(custType, email, phone);
            String lName = request.getLname();
            String fName = request.getFname();
            String licenseNum = String.valueOf(request.getLicensenum());
            String insName = request.getInsname();
            String insNum = String.valueOf(request.getInsnum());
            customerService.addIndividualCustomer(custId, lName, fName, licenseNum, insName, insNum);
            accountServie.Register(accName, pwd, custId, "I");
            jsonObject.put("message","Account registered successfully. ");
            return jsonObject;
        }

    }

    @RequestMapping(value = "/corp/register", method = RequestMethod.POST)
    public Object corpRegister(@RequestBody CorpRegisterRequestEntry request) {
        String accName = request.getAccname();
        String pwd = request.getPwd();
        JSONObject jsonObject = new JSONObject();
        if (accName == null || pwd == null || accName.equals("") || pwd.equals("")) {
            jsonObject.put("message","Account Name or password could not be empty. ");
            return jsonObject;
        } else {
            if (accountServie.findAccountByAccName(accName) != null) {
                jsonObject.put("message","Account Name has been used. ");
                return jsonObject;
            }
            String street = request.getStreet();
            String state = request.getState();
            String country = request.getCountry();
            int zipcode = Integer.parseInt(request.getZipcode());
            addressService.addAddr(street,state,country,zipcode);
            int addrId = addressService.findAddressIdByInfo(street, state, country, zipcode);
            String custType = "C";
            String email = request.getEmail();
            String phone = request.getPhone();
            customerService.addNewCustomer(custType, email, phone, addrId);
            int custId = customerService.findCustomerByInfo(custType, email, phone);
            String corpName = request.getCorpname();
            String regNum = request.getRegnum();
            String empId = request.getEmpid();
            customerService.addCorpCustomer(custId, corpName, regNum, empId);
            accountServie.Register(accName, pwd, custId, "C");
            jsonObject.put("message","Account registered successfully. ");
            return jsonObject;
            
        }

    }
}
