package com.wow.rent.dao;

import com.wow.rent.entry.InvoiceEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface InvoiceMapper {

    @Select("SELECT * FROM zzz_invoice WHERE orderid = #{orderId}")
    InvoiceEntry findInvoiceByOrderId(int orderId);
}
