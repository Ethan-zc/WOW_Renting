package com.wow.rent.entry;

import lombok.Data;

@Data
public class AccountEntry {

    private int accId;
    private String accName;
    private String pwd;
    private int custId;
    private String custType;

}
