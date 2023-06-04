package com.example.demo.service.saveStrategy;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;

import java.io.FileWriter;
import java.util.List;

public class JsonStrategy extends SaveStrategy{
    @Override
    public boolean save(List<EmployeePropertyDto> propertyDtos) {
        StringBuilder text = new StringBuilder();
        text.append("{\"properties\":[\n");
        for(EmployeePropertyDto p : propertyDtos){
            if(propertyDtos.indexOf(p) != 0)
                text.append(",");
            String location = "\t{\"location\":\"" + p.getLocation() + "\",";
            text.append(location);
            String price = "\t\"price\":\"" + p.getPrice() + "\",";
            text.append(price);
            String type = "\t\"type\":\"" + p.getType() + "\",";
            text.append(type);
            String roomno = "\t\"roomno\":\"" + p.getRoomNumber() + "\"}";
            text.append(roomno);
        }
        text.append("]}");
        try {
            FileWriter fileOut = new FileWriter("props.json");
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
