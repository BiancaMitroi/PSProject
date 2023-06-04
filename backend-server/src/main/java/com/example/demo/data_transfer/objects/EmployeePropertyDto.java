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
public class EmployeePropertyDto {
    private Long id;
    private String location;
    private Float price;
    private PropertyType type;
    private Integer roomNumber;

    public String toCSV(){
        return "" + this.id + "," + this.location + "," + this.price + "," + this.type + "," + this.roomNumber;
    }

    public String toString(){
        return "" + this.id + " " + this.location + " " + this.price + " " + this.type + " " + this.roomNumber;
    }
}
