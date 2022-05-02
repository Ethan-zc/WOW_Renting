package com.wow.rent.entry;

import lombok.Data;

@Data
public class AccountEntry {

    private long accId;
    private String accName;
    private String pwd;
    private long custId;
    private String custType;

}
