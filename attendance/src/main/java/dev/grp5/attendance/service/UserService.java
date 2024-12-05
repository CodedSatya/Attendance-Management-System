package dev.grp5.attendance.service;
import dev.grp5.attendance.model.User;
import dev.grp5.attendance.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // public User findUserByUsername(String username){
    //     return userRepository.findByUserName(username);
    // }

    public User findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
    public List<User> findAllUsers(){
      return userRepository.findAll();
    }


}
