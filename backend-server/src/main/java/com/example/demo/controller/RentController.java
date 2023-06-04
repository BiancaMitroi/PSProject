package com.example.demo.controller;

import com.example.demo.data_transfer.objects.RentDto;
import com.example.demo.model.entity.Rent;
import com.example.demo.service.interfaces.IRentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/rent")
public class RentController {
    @Autowired
    private IRentService rentService;

    @GetMapping("/get")
    public List<Rent> getRents() {
        return rentService.getRents();
    }

    @PostMapping("/add")
    public ResponseEntity<Rent> saveRent(@RequestBody RentDto rent){
        return rentService.saveRent(rent);
    }
}
