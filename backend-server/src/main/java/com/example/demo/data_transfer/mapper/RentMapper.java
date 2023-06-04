package com.example.demo.data_transfer.mapper;

import com.example.demo.data_transfer.objects.RentDto;
import com.example.demo.model.entity.Rent;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class RentMapper {
    public static RentDto mapModelToDto(Rent rent){
        return new RentDto(rent.getClientId(), rent.getPropId());
    }

    public static Rent mapDtoToModel(RentDto dto){
        Rent rent = new Rent();
        rent.setClientId(dto.getClientId());
        rent.setPropId(dto.getPropId());
        rent.setDate(LocalDateTime.now().toString());
        return rent;
    }

    public static List<RentDto> mapModelsToDtos(List<Rent> rents){
        List<RentDto> dtos = new ArrayList<>();
        for(Rent rent : rents)
            dtos.add(mapModelToDto(rent));
        return dtos;
    }
}
