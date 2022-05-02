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
                jsonObject.put("status", "fail");
                jsonObject.put("message","Account Name has been used. ");
                return jsonObject;
            }
            String street = request.getStreet();
            String state = request.getState();
            String country = request.getCountry();
            int zipcode = request.getZipcode();
            if (addressService.findAddressIdByInfo(street, state, country, zipcode) == null) {
                addressService.addAddr(street,state,country,zipcode);
            }
            int addrId = addressService.findAddressIdByInfo(street, state, country, zipcode);
            String custType = "I";
            String email = request.getEmail();
            String phone = request.getPhone();

            // When email is duplicated.
            if (customerService.findCustomerIdByEmail(email) != null) {
                jsonObject.put("status", "fail");
                jsonObject.put("message","email has been used. ");
                return jsonObject;
            }

            customerService.addNewCustomer(custType, email, phone, addrId);
            int custId = customerService.findCustomerByInfo(custType, email, phone);
            String lName = request.getLname();
            String fName = request.getFname();
            String licenseNum = String.valueOf(request.getLicensenum());
            String insName = request.getInsname();
            String insNum = String.valueOf(request.getInsnum());
            customerService.addIndividualCustomer(custId, lName, fName, licenseNum, insName, insNum);
            accountServie.Register(accName, pwd, custId, "I");
            jsonObject.put("status", "success");
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
                jsonObject.put("status", "fail");
                jsonObject.put("message","Account Name has been used. ");
                return jsonObject;
            }
            String street = request.getStreet();
            String state = request.getState();
            String country = request.getCountry();
            int zipcode = request.getZipcode();

            if (addressService.findAddressIdByInfo(street, state, country, zipcode) == null) {
                addressService.addAddr(street,state,country,zipcode);
            }
            int addrId = addressService.findAddressIdByInfo(street, state, country, zipcode);
            String custType = "C";
            String email = request.getEmail();
            String phone = request.getPhone();

            if (customerService.findCustomerIdByEmail(email) != null) {
                jsonObject.put("status", "fail");
                jsonObject.put("message","email has been used. ");
                return jsonObject;
            }

            customerService.addNewCustomer(custType, email, phone, addrId);
            int custId = customerService.findCustomerByInfo(custType, email, phone);
            String corpName = request.getCorpname();
            String regNum = request.getRegnum();
            String empId = request.getEmpid();
            if (customerService.addCorpCustomer(custId, corpName, regNum, empId)>0) {
                System.out.println("success");
            } else {
                System.out.println("failed");
            }
            accountServie.Register(accName, pwd, custId, "C");
            jsonObject.put("status", "success");
            jsonObject.put("message","Account registered successfully. ");
            return jsonObject;
            
        }

    }
}
