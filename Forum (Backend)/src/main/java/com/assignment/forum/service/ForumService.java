package com.assignment.forum.service;

import com.assignment.forum.domain.Forum;
import com.assignment.forum.dto.ForumDTO;

import java.util.List;

public interface ForumService {
    ForumDTO createArticle(ForumDTO forum);
    List<ForumDTO> getArticle(Long articleId, String formStatus);
    ForumDTO updateArticle(Long id, ForumDTO forum);
    String deleteArticle(Long articleId);
}
