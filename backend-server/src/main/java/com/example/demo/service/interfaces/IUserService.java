package com.example.demo.service.interfaces;

import com.example.demo.data_transfer.objects.RegisterUserDto;
import com.example.demo.data_transfer.objects.UserDto;
import com.example.demo.model.entity.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {
    public List<UserDto> getUsers();
    public List<UserDto> getAdminUsers();
    public ResponseEntity<UserDto> getUserById(Long id);
    public ResponseEntity<RegisterUserDto> getAdminUserById(Long id);
    public ResponseEntity<Void> deleteUser(Long id);
    public ResponseEntity<RegisterUserDto> updateUser(Long id, RegisterUserDto user);
    public ResponseEntity<UserDto> saveUser(RegisterUserDto user);
    public ResponseEntity<UserDto> login(User userToCheck);
}
