package com.wow.rent.controller;

import com.alibaba.fastjson.JSONObject;
import com.wow.rent.entry.*;
import com.wow.rent.service.AccountServie;
import com.wow.rent.service.AddressService;
import com.wow.rent.service.CustomerService;
import io.swagger.annotations.Api;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.wow.rent.model.Result;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.xml.ws.RequestWrapper;
import java.util.List;

@RestController
@RequestMapping("/account")
@Api(tags = "Account")
public class AccountController {

    public static final String SESSION_NAME = "userInfo";
    @Autowired
    private AccountServie accountServie;
    @Autowired
    private AddressService addressService;
    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/type", method = RequestMethod.GET)
    public Result<String> getAccountType(@RequestParam(value = "accName")String accName) {
        Result<String> result = new Result<>();
        if (accountServie.findAccountByAccName(accName) == null) {
            result.setResultFailed("Account does not exist!");
            return result;
        }
        String custType = accountServie.findCustTypeByAccName(accName);
        result.setResultSuccess("Success!", custType);
        return result;
    }

    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public Result<ProfileEntry> getAccountProfile(HttpServletRequest request, HttpServletResponse response) {
        Result<ProfileEntry> result = new Result<>();

        // is login?
        if (!this.isLogin(request, response).isSuccess()) {
            result.setResultFailed("No login info！");
            return result;
        }

        // get user account name
        AccountEntry sessionUser = (AccountEntry) (request.getSession()).getAttribute(SESSION_NAME);
        String accName = sessionUser.getAccName();

        AccountEntry account = accountServie.findAccountByAccName(accName);
        String custType = accountServie.findCustTypeByAccName(accName);
        ProfileEntry profile = new ProfileEntry();
        profile.setAccName(accName);
        profile.setCustType(custType);
        CustomerEntry customer = customerService.findCustomerById(account.getCustId());
        profile.setEmail(customer.getEmail());
        profile.setPhone(customer.getPhone());
        AddressEntry address = addressService.findAddressById(customer.getAddrId());
        profile.setStreet(address.getStreet());
        profile.setState(address.getState());
        profile.setCountry(address.getCountry());
        profile.setZipcode(address.getZipcode());
        if (custType.equals("I")) {
            IndividualCustEntry indiCust = customerService.findIndiCustById(account.getCustId());
            profile.setLName(indiCust.getLName());
            profile.setFName(indiCust.getFName());
            profile.setLicenseNum(indiCust.getLicenseNum());
            profile.setInsName(indiCust.getInsName());
            profile.setInsNum(indiCust.getInsNum());
        } else if (custType.equals("C")) {
            CorpCustEntry corpCust = customerService.findCorpCustById(account.getCustId());
            profile.setCorpName(corpCust.getCorpName());
            profile.setRegNum(corpCust.getRegNum());
            profile.setEmpId(corpCust.getEmpId());
        }
        result.setResultSuccess("Success!", profile);
        return result;
    }

    @RequestMapping(value = "/indi/register", method = RequestMethod.POST)
    public Object indiRegister(@RequestBody IndiRegisterRequestEntry request) {
        String accName = request.getAccname();
        String pwd = DigestUtils.md5Hex(request.getPwd());
        JSONObject jsonObject = new JSONObject();
        if (accName == null || accName.equals("") || pwd.equals("")) {
            jsonObject.put("message","Account Name or password could not be empty. ");
            return jsonObject;
        } else {
            if (accountServie.findAccountByAccName(accName) != null) {
                jsonObject.put("status", "fail");
                jsonObject.put("message","accname");
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
                jsonObject.put("message","email");
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
        String pwd = DigestUtils.md5Hex(request.getPwd());
        JSONObject jsonObject = new JSONObject();
        if (accName == null || accName.equals("") || pwd.equals("")) {
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

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Object login(@RequestBody LoginRequestEntry loginRequest, HttpServletRequest httpRequest, HttpServletResponse response) {
        Result<AccountEntry> result;

        result = accountServie.login(loginRequest);
        // if login successfully, set session.
        if (result.isSuccess()) {
            httpRequest.getSession().setAttribute(SESSION_NAME, result.getData());
        }
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Origin",httpRequest.getHeader("Origin"));
        result.setData(null);
        return result;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public Object logout(HttpServletRequest request,HttpServletResponse response) {
        Result result = new Result();
        request.getSession().setAttribute(SESSION_NAME, null);
        result.setResultSuccess("Successfully logged out！", null);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Origin",request.getHeader("Origin"));
        return result;
    }

    @RequestMapping(value = "/islogin", method = RequestMethod.GET)
    public Result<AccountEntry> isLogin(HttpServletRequest request, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Origin",request.getHeader("Origin"));
        HttpSession session = request.getSession();
        System.out.println(session);

        System.out.println(request.getSession().getId());

        Result<AccountEntry> result = new Result<>();
        // get user info from session
        AccountEntry sessionUser = (AccountEntry) session.getAttribute(SESSION_NAME);

        // if get null from session, is not logged.
        if (sessionUser == null) {
            result.setResultFailed("No login info！");
            return result;
        }
        // if logged, verify password using db info.
        AccountEntry getUser = null;
        try {
            getUser = accountServie.findAccountByAccName(sessionUser.getAccName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (getUser == null || !getUser.getPwd().equals(sessionUser.getPwd())) {
            result.setResultFailed("Account info error！");
            return result;
        }
        result.setResultSuccess("Login！", null);
        return result;
    }

//    @RequestMapping(value = "/profile", method = RequestMethod.GET)
//    public Result<AccountEntry> getProfile(@RequestParam(value = "accName")String accName) {
//        Result<List<PaymentEntry>> result = new Result<>();
//        if (accountServie.findAccountByAccName(accName) == null) {
//            result.setResultFailed("Account does not exist!");
//            return result;
//        }
//    }

}
