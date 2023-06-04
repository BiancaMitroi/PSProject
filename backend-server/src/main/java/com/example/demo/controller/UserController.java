package com.example.demo.controller;

import com.example.demo.data_transfer.objects.RegisterUserDto;
import com.example.demo.data_transfer.objects.UserDto;
import com.example.demo.model.entity.User;
import com.example.demo.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/getclients")
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/get")
    public List<UserDto> getAdminUsers() {
        return userService.getAdminUsers();
    }

    @GetMapping("getclient/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("get/{id}")
    public ResponseEntity<RegisterUserDto> getAdminUserById(@PathVariable Long id) {
        return userService.getAdminUserById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterUserDto dto) {
        return userService.saveUser(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody User userToCheck) {
        return userService.login(userToCheck);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<RegisterUserDto> editUser(@PathVariable Long id, @RequestBody RegisterUserDto userDetails) {
        return userService.updateUser(id, userDetails);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}
