package com.example.demo.controller;

import com.example.demo.data_transfer.objects.ClientPropertyDto;
import com.example.demo.data_transfer.objects.EmployeePropertyDto;
import com.example.demo.model.entity.Property;
import com.example.demo.service.interfaces.IPropertyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PropertyControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private IPropertyService propertyService;

    private ClientPropertyDto clientPropertyDto;
    private EmployeePropertyDto employeePropertyDto;
    private Property property;

    @BeforeEach
    void setUp() {
        clientPropertyDto = new ClientPropertyDto();
        clientPropertyDto.setLocation("Location");

        employeePropertyDto = new EmployeePropertyDto();
        employeePropertyDto.setId(2L);
        employeePropertyDto.setLocation("Location");

        property = new Property();
        property.setId(1L);
        property.setLocation("Location");
    }

    @Test
    void testGetProperties() throws Exception {
        Mockito.when(propertyService.getProperties()).thenReturn(List.of(clientPropertyDto));
        MvcResult mvcResult = mockMvc.perform(get("/property/get").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn();
        // Assertions to verify the response
    }

    @Test
    void testGetIdProperties() throws Exception {
        Mockito.when(propertyService.getIdProperties()).thenReturn(List.of(employeePropertyDto));
        MvcResult mvcResult = mockMvc.perform(get("/property/get_id").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn();
        // Assertions to verify the response
    }

    @Test
    void testGetPropertyById() throws Exception {
        Mockito.when(propertyService.getPropertyById(1L)).thenReturn(ResponseEntity.of(Optional.of(clientPropertyDto)));
        MvcResult mvcResult = mockMvc.perform(get("/property/get/1").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andReturn();
        // Assertions to verify the response
    }

    @Test
    void testDeleteProperty() throws Exception {
        Mockito.when(propertyService.deleteProperty(1L)).thenReturn(ResponseEntity.noContent().build());
        mockMvc.perform(delete("/property/delete/1").accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent()).andReturn();
    }

    // similar tests for other methods...
}
