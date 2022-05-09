package com.wow.rent.service;

import com.wow.rent.entry.AccountEntry;
import com.wow.rent.entry.LoginRequestEntry;
import com.wow.rent.model.Result;

public interface AccountServie {

    int Register(String accName, String pwd, int custId, String custType);

    AccountEntry findAccountByAccName(String accName);

    String findCustTypeByAccName(String accName);

    Result<AccountEntry> login(LoginRequestEntry loginRequest);

    String getRoleByAccName(String accName);

    Boolean isAdmin(String accName);

    void addAccRole(int accId);
}
