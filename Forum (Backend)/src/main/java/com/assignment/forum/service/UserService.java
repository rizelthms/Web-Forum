package com.assignment.forum.service;

import com.assignment.forum.domain.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    List<User> getUser(Long userId, String role);
    User updateUser(Long userId, User user);
    String deleteUser(Long userId);
    User login(User user) throws Exception;
}
