package com.wow.rent.dao;

import com.wow.rent.entry.CustomerEntry;
import com.wow.rent.entry.IndividualCustEntry;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface CustomerMapper {

    @Select("SELECT * FROM zzz_customer WHERE custid = #{custid}")
    CustomerEntry findCustomerById(long custid);

    @Insert("INSERT INTO zzz_customer (custtype, email, phone, addrid) VALUES (#{custType}, #{email}, #{phone}, #{addrid})")
    int addCustomer(String custType, String email, String phone, int addrid);

    @Select("SELECT custid FROM zzz_customer WHERE custtype = #{custType} AND email = #{email} AND phone = #{phone}")
    Integer findCustomerByInfo(String custType, String email, String phone);

    @Select("SELECT custid FROM zzz_customer WHERE email = #{eMail}")
    Integer findCustomerByEmail(String eMail);

    @Insert("INSERT INTO zzz_individual (custid, custtype, lname, fname, licensenum, insname, insnum) " +
            "VALUES (#{custId}, #{custType}, #{lName}, #{fName}, #{licenseNum}, #{insName}, #{insNum})")
    int addIndividualCustomer(long custId, String custType, String lName, String fName, String licenseNum, String insName, String insNum);

    @Insert("INSERT INTO zzz_corporate (custid, custtype, corpname, regnum, empid) " +
            "VALUES (#{custId}, #{custType}, #{corpName}, #{regNum}, #{empId})")
    int addCorpCustomer(long custId, String custType, String corpName, String regNum, String empId);

    @Select("SELECT * from zzz_individual WHERE licensenum = #{licenseNum}")
    IndividualCustEntry findIndiCustByLicenseNum(String licenseNum);

}
