package com.assignment.forum.controller;

import com.assignment.forum.domain.ForumCategory;
import com.assignment.forum.service.ForumCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/api/forum-category")
public class ForumCategoryController {

    @Autowired
    ForumCategoryService forumCategoryService;

    @PostMapping(value = "")
    ForumCategory createCategory(@RequestBody ForumCategory category) {
        return forumCategoryService.createCategory(category);
    }

    @GetMapping(value = {"","/{id}"})
    List<ForumCategory> getCategories(@PathVariable(required = false) Integer id, @RequestParam(required = false) Boolean includePostCount) {
        return forumCategoryService.getCategories(id, includePostCount);
    }

    @PutMapping(value = "/{categoryId}")
    ForumCategory updateCategory(@PathVariable Integer categoryId, @RequestBody ForumCategory category) {
        return forumCategoryService.updateCategory(categoryId,category);
    }

    @DeleteMapping(value = {"","/{categoryId}"})
    String deleteCategory(@PathVariable(required = false) Integer categoryId){
        return forumCategoryService.deleteCategory(categoryId);
    }
}
