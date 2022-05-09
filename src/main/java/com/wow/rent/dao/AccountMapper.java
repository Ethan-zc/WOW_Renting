package com.wow.rent.dao;

import com.wow.rent.entry.AccountEntry;
import com.wow.rent.entry.AddressEntry;
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

    @Select("SELECT custtype FROM zzz_account WHERE accname = #{accName}")
    String findCustTypeByAccName(String accName);

    @Select("SELECT role FROM zzz_account NATURAL JOIN zzz_acc_role NATURAL JOIN zzz_role WHERE accname = #{accName}")
    String getRoleByAccName(String accName);

    @Insert("INSERT INTO zzz_acc_role (accid, rid) VALUES (#{accId}, 1)")
    void addAccRole(int accId);

}
