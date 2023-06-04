package com.example.demo.service.implementation;

import com.example.demo.data_transfer.mapper.UserMapper;
import com.example.demo.data_transfer.objects.RegisterUserDto;
import com.example.demo.data_transfer.objects.UserDto;
import com.example.demo.model.entity.User;
import com.example.demo.model.enums.UserType;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.interfaces.IUserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TwilioService twilioService;

    @Override
    public List<UserDto> getUsers() {
        return UserMapper.mapModelsToDtos(userRepository.findAll().stream().filter(e -> e.getRole().equals(UserType.CLIENT)).toList());
    }

    @Override
    public List<UserDto> getAdminUsers() {
        return UserMapper.mapModelsToDtos(userRepository.findAll());
    }

    @Override
    public ResponseEntity<UserDto> getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(UserMapper.mapModelToDto(user));
    }

    @Override
    public ResponseEntity<RegisterUserDto> getAdminUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if(user == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(UserMapper.mapModelToAdminDto(user));
    }

    @Override
    public ResponseEntity<Void> deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<RegisterUserDto> updateUser(Long id, RegisterUserDto user) {
        User user1 = userRepository.findById(id).orElse(null);
        String password = "";
        String username = "";
        String mail = "";
        String phone = "";
        UserType role = UserType.NONE;
        if(user1 != null){
            if(user.getMail() != null){
                user1.setMail(user.getMail());
                mail = user.getMail();
            }
            if(user.getPhone() != null){
                user1.setPhone(user.getPhone());
                phone = user.getPhone();
            }
            if(user.getUsername() != null){
                user1.setUsername(user.getUsername());
                username = user.getUsername();
            }
            if(user.getRole() != null){
                user1.setRole(user.getRole());
                role = user.getRole();
            }
            if(user.getPassword() != null){
                user1.setSalt(BCrypt.gensalt());
                user1.setPassword(BCrypt.hashpw(user.getPassword(), user1.getSalt()));
                password = user.getPassword();
            }
            String to = user1.getMail();
            String toPhoneNumber = user1.getPhone();

            userRepository.save(user1);
            String subject = "Credentials update";
            String body = "Your new credentials:\n username: " + user1.getUsername() + " \n mail: " + mail + " \n phone: " + phone + " \n password: " + password + "\n role: " + role.toString();
            emailService.sendMail(to, subject, body);
            twilioService.sendWhatsAppMessage(toPhoneNumber, body);
            return ResponseEntity.ok(UserMapper.mapModelToAdminDto(user1));
        }else
            return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<UserDto> saveUser(RegisterUserDto dto) {
        User user = UserMapper.mapDtoToModel(dto);
        user.setSalt(BCrypt.gensalt());
        user.setPassword(BCrypt.hashpw(user.getPassword(), user.getSalt()));
        userRepository.save(user);
        return ResponseEntity.ok(UserMapper.mapModelToDto(user));
    }

    @Override
    public ResponseEntity<UserDto> login(User userToCheck) {
        String username = userToCheck.getUsername();
        String passwordToCheck = userToCheck.getPassword();
        User user = userRepository.findByUsername(username);

        if(user == null || !BCrypt.checkpw(passwordToCheck, user.getPassword()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(UserMapper.mapModelToDto(user));
    }
}
