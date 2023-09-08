package com.assignment.forum.controller;

import com.assignment.forum.domain.User;
import com.assignment.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(value = "login")
    User login(@RequestBody User user) throws Exception {
        return userService.login(user);
    }

    @PostMapping(value = "")
    User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping(value = {"","/{userId}"})
    List<User> getUser(@PathVariable(required = false) Long userId, @RequestParam(required = false) String role){
        return userService.getUser(userId,role);
    }

    @PutMapping(value = "/{userId}")
    User updateUser(@PathVariable Long userId, @RequestBody User user){
        return userService.updateUser(userId,user);
    }

    @DeleteMapping(value = {"","/{userId}"})
    String deleteUser(@PathVariable(required = false) Long userId){
        return userService.deleteUser(userId);
    }
}
