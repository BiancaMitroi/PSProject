package com.example.demo.service.saveStrategy;

import com.example.demo.data_transfer.objects.EmployeePropertyDto;

import java.io.FileWriter;
import java.util.List;

public class XmlStrategy extends SaveStrategy{
    @Override
    public boolean save(List<EmployeePropertyDto> propertyDtos) {
        StringBuilder text = new StringBuilder();
        text.append("<properties>\n");
        for(EmployeePropertyDto p : propertyDtos){
            String location = "\t<location>" + p.getLocation() + "</location>\n";
            text.append(location);
            String price = "\t<price>" + p.getPrice() + "</price>\n";
            text.append(price);
            String type = "\t<type>" + p.getType() + "</type>\n";
            text.append(type);
            String roomno = "\t<roomno>" + p.getRoomNumber() + "</roomno>\n";
            text.append(roomno);
        }
        text.append("</properties>");
        try {
            FileWriter fileOut = new FileWriter("props.xml");
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
