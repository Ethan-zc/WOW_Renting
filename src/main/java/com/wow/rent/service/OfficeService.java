package com.wow.rent.service;

import com.wow.rent.entry.OfficeEntry;
import org.springframework.stereotype.Service;

import java.util.List;

public interface OfficeService {

    List<OfficeEntry> findAllOffice();

}
