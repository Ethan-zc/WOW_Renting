package com.wow.rent.controller;

import com.wow.rent.entry.AddressEntry;
import com.wow.rent.service.AddressService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/address")
@Api(tags = "Address API")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @ApiOperation(value = "Get all address entries.", notes = "directly select from db")
    @RequestMapping(value = "/addrlist",method = RequestMethod.GET)
    public List<AddressEntry> findUserList(){
        return addressService.findAddressList();
    }

    @RequestMapping(value = "/add",method = RequestMethod.GET)
    public String addUser(@RequestParam(value = "addrid")int addrId,
                          @RequestParam(value = "street")String street,
                          @RequestParam(value = "state")String state,
                          @RequestParam(value = "country")String country,
                          @RequestParam(value = "zipcode")int zipcode){
        int flag=addressService.addAddr(addrId,street,state,country,zipcode);
        if(flag>0){
            return "success";
        }
        return "error";
    }

    @RequestMapping(value = "/delete",method = RequestMethod.GET)
    public String deleteUser(@RequestParam(value = "id")int id){
        if(addressService.deleteAddr(id)>0){
            return "success";
        }
        return "error";
    }
}
