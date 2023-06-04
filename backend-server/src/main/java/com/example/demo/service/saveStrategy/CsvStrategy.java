package com.example.demo.service.saveStrategy;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;

import java.io.FileWriter;
import java.util.List;

public class CsvStrategy extends SaveStrategy{
    @Override
    public boolean save(List<EmployeePropertyDto> propertyDtos) {
        StringBuilder text = new StringBuilder();
        text.append("location,price,type,roomno\n");
        for(EmployeePropertyDto p : propertyDtos){
            String s = p.toCSV() + '\n';
            text.append(s);
        }
        try {
            FileWriter fileOut = new FileWriter("props.csv");
            fileOut.write(text.toString());
            fileOut.close();
            System.out.println("Object has been serialized");
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }
}
