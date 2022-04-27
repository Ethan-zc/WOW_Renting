package com.wow.rent.dao;

import com.wow.rent.entry.OfficeEntry;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OfficeMapper {

    @Select("select * from zzz_office")
    List<OfficeEntry> findAllOffice();
}
