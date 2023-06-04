package com.example.demo.data_transfer.mapper;

import com.example.demo.data_transfer.objects.RegisterUserDto;
import com.example.demo.data_transfer.objects.UserDto;
import com.example.demo.model.entity.User;

import java.util.ArrayList;
import java.util.List;

public class UserMapper {

    public static User mapDtoToModel(RegisterUserDto dto){
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setMail(dto.getMail());
        user.setPhone(dto.getPhone());
        user.setPassword(dto.getPassword());
        user.setRole(dto.getRole());
        return user;
    }

    public static UserDto mapModelToDto(User user){
        return new UserDto(user.getId(), user.getUsername(), user.getMail(), user.getPhone(), user.getRole());
    }

    public static List<UserDto> mapModelsToDtos(List<User> users){
        List<UserDto> dtos = new ArrayList<>();
        for(User user : users)
            dtos.add(mapModelToDto(user));
        return dtos;
    }

    public static RegisterUserDto mapModelToAdminDto(User user){
        return new RegisterUserDto(user.getUsername(), user.getMail(), user.getPhone(), user.getPassword(), user.getRole());
    }

    public static List<RegisterUserDto> mapModelsToAdminDtos(List<User> users){
        List<RegisterUserDto> dtos = new ArrayList<>();
        for(User user : users)
            dtos.add(mapModelToAdminDto(user));
        return dtos;
    }
}
