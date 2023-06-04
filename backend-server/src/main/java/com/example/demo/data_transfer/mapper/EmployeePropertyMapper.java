package com.example.demo.data_transfer.mapper;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;
import com.example.demo.model.entity.Property;

import java.util.ArrayList;
import java.util.List;

public class EmployeePropertyMapper {
    public static EmployeePropertyDto mapModelToDto(Property property){
        return new EmployeePropertyDto(property.getId(), property.getLocation(), property.getPrice(), property.getPropertyType(), property.getRoomNumber());
    }

    public static List<EmployeePropertyDto> mapModelsToDtos(List<Property> properties){
        List<EmployeePropertyDto> dtos = new ArrayList<>();
        for(Property property : properties)
            dtos.add(mapModelToDto(property));
        return dtos;
    }
}
