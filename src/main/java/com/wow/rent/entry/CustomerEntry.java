package com.wow.rent.entry;

import lombok.Data;

@Data
public class CustomerEntry {

    private long custId;
    private String custType;
    private String email;
    private String phone;
    private long addrId;
}
