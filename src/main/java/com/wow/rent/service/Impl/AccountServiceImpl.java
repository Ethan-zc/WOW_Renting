package com.wow.rent.service.Impl;

import com.wow.rent.dao.AccountMapper;
import com.wow.rent.entry.AccountEntry;
import com.wow.rent.entry.LoginRequestEntry;
import com.wow.rent.model.Result;
import com.wow.rent.service.AccountServie;
import org.apache.commons.codec.digest.DigestUtils;
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

    @Override
    public String findCustTypeByAccName(String accName) {
        return accountMapper.findCustTypeByAccName(accName);
    }

    @Override
    public Result<AccountEntry> login(LoginRequestEntry loginRequest) {
        Result<AccountEntry> result = new Result<>();
        AccountEntry getAccount = null;
        try {
            getAccount = accountMapper.findAccountByAccName(loginRequest.getAccName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (getAccount == null) {
            result.setResultFailed("Account does not exist！");
            return result;
        }
        if (!getAccount.getPwd().equals(DigestUtils.md5Hex(loginRequest.getPwd()))) {
            result.setResultFailed("Account Name or password error！");
            return result;
        }
        result.setResultSuccess("Login Successfully！", getAccount);
        return result;
    }

}
