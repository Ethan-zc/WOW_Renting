package com.wow.rent.controller;

import com.wow.rent.entry.AddressEntry;
import com.wow.rent.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService userService;

    @RequestMapping(value = "/addrlist",method = RequestMethod.GET)
    public List<AddressEntry> findUserList(){
        return userService.findAddressList();
    }

    @RequestMapping(value = "/add",method = RequestMethod.GET)
    public String addUser(@RequestParam(value = "addrid")int addrId,
                          @RequestParam(value = "street")String street,
                          @RequestParam(value = "state")String state,
                          @RequestParam(value = "country")String country,
                          @RequestParam(value = "zipcode")int zipcode){
        int flag=userService.addAddr(addrId,street,state,country,zipcode);
        if(flag>0){
            return "success";
        }
        return "error";
    }

    @RequestMapping(value = "/delete",method = RequestMethod.GET)
    public String deleteUser(@RequestParam(value = "id")int id){
        if(userService.deleteAddr(id)>0){
            return "success";
        }
        return "error";
    }
}
