package com.wow.rent.entry;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;


@Data
public class AddressEntry {

    @ApiModelProperty(value = "Address Id", required = true)
    private int addrId;
    @ApiModelProperty(value = "Street info", required = true)
    private String street;
    @ApiModelProperty(value = "State info", required = true)
    private String state;
    @ApiModelProperty(value = "Country info", required = true)
    private String country;
    @ApiModelProperty(value = "Zipcode info", required = true)
    private int zipcode;
}
