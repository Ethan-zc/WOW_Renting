package com.wow.rent.dao;

import com.wow.rent.entry.AccountEntry;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AccountMapper {

    @Insert("INSERT INTO zzz_account (accname, pwd, custid, custtype) " +
            "VALUES (#{accName}, #{pwd}, #{custId}, #{custType})")
    int Register(String accName, String pwd, int custId, String custType);

    @Select("SELECT * FROM zzz_account WHERE accname = #{accName}")
    AccountEntry findAccountByAccName(String accName);



}
