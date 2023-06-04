package com.example.demo.service.implementation;

import com.example.demo.data_transfer.mapper.RentMapper;
import com.example.demo.data_transfer.objects.RentDto;
import com.example.demo.model.entity.Property;
import com.example.demo.model.entity.Rent;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.repository.RentRepository;
import com.example.demo.service.interfaces.IRentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;

@Service
public class RentService implements IRentService{

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public List<Rent> getRents() {
        return rentRepository.findAll();
    }

    @Override
    public ResponseEntity<Rent> saveRent(RentDto dto) {
        System.out.println(dto.getClientId());
        System.out.println(dto.getPropId());
        Rent rent = RentMapper.mapDtoToModel(dto);
        rentRepository.save(rent);
        Property property = propertyRepository.findById(rent.getPropId()).orElse(null);
        assert property != null;
        property.setRented(true);
        propertyRepository.save(property);
        return ResponseEntity.created(URI.create("/rents/" + rent.getId())).body((rent));
    }
}