package com.wow.rent.service;

import com.wow.rent.entry.AccountEntry;
import com.wow.rent.entry.IndividualCustEntry;

public interface AccountServie {

    int Register(String accName, String pwd, int custId, String custType);

    AccountEntry findAccountByAccName(String accName);
}
