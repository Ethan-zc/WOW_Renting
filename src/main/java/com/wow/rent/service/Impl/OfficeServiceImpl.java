package com.wow.rent.service.Impl;

import com.wow.rent.dao.OfficeMapper;
import com.wow.rent.entry.CarEntry;
import com.wow.rent.entry.OfficeEntry;
import com.wow.rent.service.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfficeServiceImpl implements OfficeService {

    @Autowired
    protected OfficeMapper officeMapper;

    @Override
    public List<OfficeEntry> findAllOffice() {
        return officeMapper.findAllOffice();
    }

    @Override
    public List<CarEntry> findCarList(int officeId) {
        return officeMapper.findCarList(officeId);
    }
}
