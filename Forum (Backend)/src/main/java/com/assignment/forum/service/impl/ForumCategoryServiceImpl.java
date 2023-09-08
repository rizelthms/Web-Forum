package com.assignment.forum.service.impl;

import com.assignment.forum.domain.ForumCategory;
import com.assignment.forum.repository.ForumCategoryRepository;
import com.assignment.forum.repository.ForumRepository;
import com.assignment.forum.service.ForumCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumCategoryServiceImpl implements ForumCategoryService {

    @Autowired
    ForumCategoryRepository forumCategoryRepository;

    @Autowired
    ForumRepository forumRepository;

    @Override
    public ForumCategory createCategory(ForumCategory category) {
        return forumCategoryRepository.save(category);
    }

    @Override
    public List<ForumCategory> getCategories(Integer id, Boolean includePostCount) {
        if(id!=null)
            return List.of(forumCategoryRepository.findById(id).orElseThrow());
        if(includePostCount!=null){
            List<ForumCategory> forumCategories=forumCategoryRepository.findAll();
            forumRepository.findAll().forEach(form->{
                forumCategories.stream()
                        .filter(category->category.getCategoryName()
                                .equals(form.getForumCategory().getCategoryName()))
                        .findFirst().orElseThrow().incrementCount();
            });
            return forumCategories;
        }
        return forumCategoryRepository.findAll();
    }

    @Override
    public ForumCategory updateCategory(Integer categoryId, ForumCategory category) {
        ForumCategory formCategory=forumCategoryRepository.findById(categoryId).orElseThrow();
        formCategory.setCategoryName(category.getCategoryName());
        return forumCategoryRepository.save(formCategory);
    }

    @Override
    public String deleteCategory(Integer categoryId) {
        if(categoryId==null)
            forumCategoryRepository.deleteAll();
        else
            forumCategoryRepository.deleteById(categoryId);
        return "success";
    }
}
