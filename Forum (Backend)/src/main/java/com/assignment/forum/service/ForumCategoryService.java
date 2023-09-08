package com.assignment.forum.service;

import com.assignment.forum.domain.ForumCategory;

import java.util.List;

public interface ForumCategoryService {
    ForumCategory createCategory(ForumCategory category);
    List<ForumCategory> getCategories(Integer id, Boolean includePostCount);

    ForumCategory updateCategory(Integer categoryId, ForumCategory category);

    String deleteCategory(Integer categoryId);
}
