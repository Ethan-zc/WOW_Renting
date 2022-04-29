package com.wow.rent.entry;

import lombok.Data;

@Data
public class IndividualCustEntry {

    private long custId;
    private String custType;
    private String lName;
    private String fName;
    private String licenseNum;
    private String insName;
    private String insNumber;
}
