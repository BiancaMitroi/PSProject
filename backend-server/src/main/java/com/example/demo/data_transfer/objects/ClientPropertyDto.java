package com.example.demo.data_transfer.objects;

import com.example.demo.model.enums.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientPropertyDto {
    private String location;
    private float price;
    private PropertyType type;
    private int roomNumber;
}
