package com.wow.rent.dao;

import com.wow.rent.entry.InvoiceEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface InvoiceMapper {

    @Select("SELECT * FROM zzz_invoice WHERE orderid = #{orderId}")
    InvoiceEntry findInvoiceByOrderId(int orderId);

    @Select("SELECT * FROM zzz_invoice WHERE invoiceid = #{invoiceId}")
    InvoiceEntry findInvoiceByInvoiceId(int invoiceId);

    @Update("UPDATE zzz_invoice SET remain = #{remain} WHERE invoiceid = #{invoiceId}")
    void updateRemainByInvoiceId(int invoiceId, double remain);

    @Update("UPDATE zzz_invoice SET ispaid = 'Y' WHERE invoiceid = #{invoiceId}")
    void markFinishedByInvoiceId(int invoiceId);
}
