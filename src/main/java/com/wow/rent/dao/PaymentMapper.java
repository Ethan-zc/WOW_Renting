package com.wow.rent.dao;

import com.wow.rent.entry.PaymentEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PaymentMapper {

    @Select("SELECT * from zzz_payment WHERE invoiceid = #{invoiceId}")
    PaymentEntry findPaymentByInvoiceId(int invoidId);
}
