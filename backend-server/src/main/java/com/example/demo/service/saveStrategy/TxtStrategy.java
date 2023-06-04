package com.example.demo.service.saveStrategy;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;

import java.io.FileWriter;
import java.util.List;

public class TxtStrategy extends SaveStrategy{
    @Override
    public boolean save(List<EmployeePropertyDto> propertyDtos) {
        StringBuilder text = new StringBuilder();
        for(EmployeePropertyDto p : propertyDtos){
            String s = p.toString() + '\n';
            text.append(s);
        }
        try {
            FileWriter fileOut = new FileWriter("props.txt");
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
