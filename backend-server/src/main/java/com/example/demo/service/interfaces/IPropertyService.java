package com.example.demo.service.interfaces;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;
import com.example.demo.data_transfer.objects.ClientPropertyDto;
import com.example.demo.model.entity.Property;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IPropertyService {
    public List<ClientPropertyDto> getProperties();
    public List<EmployeePropertyDto> getIdProperties();
    public ResponseEntity<ClientPropertyDto> getPropertyById(Long id);
    public ResponseEntity<Void> deleteProperty(Long id);
    public ResponseEntity<ClientPropertyDto> updateProperty(Long id, ClientPropertyDto property);
    public ResponseEntity<Property> saveProperty(ClientPropertyDto property);
}
