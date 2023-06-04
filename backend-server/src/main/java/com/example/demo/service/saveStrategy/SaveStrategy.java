package com.example.demo.service.saveStrategy;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;

import java.util.List;

public abstract class SaveStrategy {
    public abstract boolean save(List<EmployeePropertyDto> propertyDtos);
}
