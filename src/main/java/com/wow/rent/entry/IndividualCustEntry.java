package com.wow.rent.entry;

import lombok.Data;

@Data
public class IndividualCustEntry {

    private int custId;
    private String custType;
    private String lName;
    private String fName;
    private String licenseNum;
    private String insName;
    private String insNum;
}
