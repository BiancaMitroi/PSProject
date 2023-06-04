package com.example.demo.data_transfer.mapper;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;
import com.example.demo.data_transfer.objects.ClientPropertyDto;
import com.example.demo.model.entity.Property;

import java.util.ArrayList;
import java.util.List;

public class ClientPropertyMapper {

    public static Property mapDtoToModel(ClientPropertyDto dto){
        Property property = new Property();
        property.setLocation(dto.getLocation());
        property.setPrice(dto.getPrice());
        property.setPropertyType(dto.getType());
        property.setRoomNumber(dto.getRoomNumber());
        return property;
    }

    public static List<ClientPropertyDto> mapModelsToDtos(List<Property> properties){
        List<ClientPropertyDto> dtos = new ArrayList<>();
        for(Property property : properties)
            dtos.add(mapModelToDto(property));
        return dtos;
    }

    public static ClientPropertyDto mapModelToDto(Property property){
        return new ClientPropertyDto(property.getLocation(), property.getPrice(), property.getPropertyType(), property.getRoomNumber());
    }

    public static EmployeePropertyDto mapModelToEmployeeDto(Property property){
        return new EmployeePropertyDto(property.getId(), property.getLocation(), property.getPrice(), property.getPropertyType(), property.getRoomNumber());
    }

    public static List<EmployeePropertyDto> mapModelsToEmployeeDtos(List<Property> properties){
        List<EmployeePropertyDto> dtos = new ArrayList<>();
        for(Property property : properties)
            dtos.add(mapModelToEmployeeDto(property));
        return dtos;
    }
}
