package com.wow.rent.dao;

import com.wow.rent.entry.PaymentEntry;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;

@Mapper
public interface PaymentMapper {

    @Select("SELECT * from zzz_payment WHERE invoiceid = #{invoiceId}")
    List<PaymentEntry> findPaymentByInvoiceId(int invoidId);

    @Insert("INSERT INTO zzz_payment (method, amount, paymdate, cardnum, invoiceid) VALUES (#{method}, #{amount}, #{paymDate}, #{cardNum}, #{invoiceId})")
    Integer createNewPayment(String method, double amount, Date paymDate, String cardNum, int invoiceId);
}
