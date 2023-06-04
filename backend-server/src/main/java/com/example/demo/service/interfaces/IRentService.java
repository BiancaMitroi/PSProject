package com.example.demo.service.interfaces;

import com.example.demo.data_transfer.objects.RentDto;
import com.example.demo.model.entity.Rent;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IRentService {
    public List<Rent> getRents();
    public ResponseEntity<Rent> saveRent(RentDto rent);
}
