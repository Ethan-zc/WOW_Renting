package com.wow.rent.service.Impl;

import com.wow.rent.dao.AccountMapper;
import com.wow.rent.entry.AccountEntry;
import com.wow.rent.entry.IndividualCustEntry;
import com.wow.rent.service.AccountServie;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountServie {

    @Autowired
    protected AccountMapper accountMapper;

    @Override
    public int Register(String accName, String pwd, int custId, String custType) {
        return accountMapper.Register(accName, pwd, custId, custType);
    }

    @Override
    public AccountEntry findAccountByAccName(String accName) {
        return accountMapper.findAccountByAccName(accName);
    }


}
