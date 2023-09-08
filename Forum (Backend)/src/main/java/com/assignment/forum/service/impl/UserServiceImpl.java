package com.assignment.forum.service.impl;

import com.assignment.forum.constants.UserRole;
import com.assignment.forum.domain.User;
import com.assignment.forum.repository.UserRepository;
import com.assignment.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long userId, User user) {
        User currentUser = userRepository.findById(userId).orElseThrow();
        currentUser.setUserName(user.getUserName());
        currentUser.setPassword(user.getPassword());
        currentUser.setUserRole(user.getUserRole());
        return userRepository.save(currentUser);
    }

    @Override
    public List<User> getUser(Long userId, String role) {
        if(userId!=null)
            return List.of(userRepository.findById(userId).orElseThrow());
        if(role!=null)
            return userRepository.findAll().stream()
                    .filter(user->user.getUserRole().equals(UserRole.valueOf(role)))
                    .collect(Collectors.toList());
        return userRepository.findAll();
    }

    @Override
    public String deleteUser(Long userId) {
        if(userId==null)
            userRepository.deleteAll();
        else
            userRepository.deleteById(userId);
        return "success";
    }

    @Override
    public User login(User user) throws Exception {
        User userFromDb = userRepository.findByUserName(user.getUserName()).orElseThrow();
        if(userFromDb.getIsActive()&&userFromDb.getPassword().equals(user.getPassword())){
            return userFromDb;
        }
        throw new Exception("user not active");
    }
}
