package com.example.demo.data_transfer.objects;

import com.example.demo.model.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDto {
    private String username;
    private String mail;
    private String phone;
    private String password;
    private UserType role;
}
