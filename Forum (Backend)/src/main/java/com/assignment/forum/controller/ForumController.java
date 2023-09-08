package com.assignment.forum.controller;

import com.assignment.forum.dto.ForumDTO;
import com.assignment.forum.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/api/forum")
public class ForumController {

    @Autowired
    ForumService forumService;

    @PostMapping(value = "")
    ForumDTO createArticle(@RequestBody ForumDTO forumDTO){
        return forumService.createArticle(forumDTO);
    }

    @GetMapping(value = {"","/{id}"})
    List<ForumDTO> getArticle(@PathVariable(required = false) Long id, @RequestParam(required = false) String status){
        return forumService.getArticle(id, status);
    }

    @PutMapping(value = "/{id}")
    ForumDTO updateArticle(@PathVariable Long id, @RequestBody ForumDTO forumDTO){
        return forumService.updateArticle(id,forumDTO);
    }

    @DeleteMapping(value = {"","/{id}"})
    String deleteArticle(@PathVariable(required = false) Long id){
        return forumService.deleteArticle(id);
    }
}
