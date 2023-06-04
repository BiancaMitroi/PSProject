package com.example.demo.controller;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;
import com.example.demo.data_transfer.objects.ClientPropertyDto;
import com.example.demo.model.entity.Property;
import com.example.demo.service.interfaces.IPropertyService;
import com.example.demo.service.saveStrategy.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/property")
public class PropertyController {
    @Autowired
    private IPropertyService propertyService;

    private SaveStrategy saveStrategy;

    @GetMapping("/get")
    public List<ClientPropertyDto> getProperties(){
        return propertyService.getProperties();
    }

    @GetMapping("/get_id")
    public List<EmployeePropertyDto> getIdProperties(){
        return propertyService.getIdProperties();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ClientPropertyDto> getPropertyById(Long id){
        return propertyService.getPropertyById(id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id){
        return propertyService.deleteProperty(id);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<ClientPropertyDto> updateProperty(@PathVariable Long id, @RequestBody ClientPropertyDto property){
        return propertyService.updateProperty(id, property);
    }

    @PostMapping("/add")
    public ResponseEntity<Property> saveProperty(@RequestBody ClientPropertyDto property){
        return propertyService.saveProperty(property);
    }

    @PatchMapping("/save/{saveAs}")
    public void saveAsFile(@PathVariable String saveAs, @RequestBody List<EmployeePropertyDto> propertyDtos){
        switch (saveAs){
            case "JSON" -> saveStrategy = new JsonStrategy();
            case "TXT" -> saveStrategy = new TxtStrategy();
            case "XML" -> saveStrategy = new XmlStrategy();
            case "CSV" -> saveStrategy = new CsvStrategy();
        }
        saveStrategy.save(propertyDtos);
    }
}
