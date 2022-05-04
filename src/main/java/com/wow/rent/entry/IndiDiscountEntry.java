package com.wow.rent.entry;

import lombok.Data;

import java.util.Date;

@Data
public class IndiDiscountEntry {

    private int discId;
    private String discType;
    private String coupNum;
    private Date validStart;
    private Date validEnd;
}
