package com.example.demo.service.implementation;

import com.example.demo.data_transfer.mapper.ClientPropertyMapper;
import com.example.demo.data_transfer.mapper.EmployeePropertyMapper;
import com.example.demo.data_transfer.objects.EmployeePropertyDto;
import com.example.demo.data_transfer.objects.ClientPropertyDto;
import com.example.demo.model.entity.Property;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.service.interfaces.IPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService implements IPropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public List<ClientPropertyDto> getProperties() {
        return ClientPropertyMapper.mapModelsToDtos(propertyRepository.findAll().stream().filter(p -> (!p.isRented())).toList());
    }

    @Override
    public List<EmployeePropertyDto> getIdProperties() {
        return EmployeePropertyMapper.mapModelsToDtos(propertyRepository.findAll().stream().filter(p -> (!p.isRented())).toList());
    }

    @Override
    public ResponseEntity<ClientPropertyDto> getPropertyById(Long id) {
        Property property = propertyRepository.findById(id).orElse(null);
        if(property == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(ClientPropertyMapper.mapModelToDto(property));
    }

    @Override
    public ResponseEntity<Void> deleteProperty(Long id) {
        Optional<Property> property = propertyRepository.findById(id);
        if(property.isPresent()){
            propertyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<ClientPropertyDto> updateProperty(Long id, ClientPropertyDto property) {
        Property property1 = propertyRepository.findById(id).orElse(null);
        if(property1 != null){
            if(!property.getLocation().equals(""))
                property1.setLocation(property.getLocation());
            if(property.getType() != null)
                property1.setPropertyType(property.getType());
            if(property.getPrice() != 0)
                property1.setPrice(property.getPrice());
            if(property.getRoomNumber() != 0)
                property1.setRoomNumber(property.getRoomNumber());
            propertyRepository.save(property1);
            return ResponseEntity.ok(ClientPropertyMapper.mapModelToDto(property1));
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Property> saveProperty(ClientPropertyDto property) {
        Property property1 = ClientPropertyMapper.mapDtoToModel(property);
        propertyRepository.save(property1);
        return ResponseEntity.created(URI.create("/properties/" + property1.getId())).body((property1));
    }
}
