package com.assignment.forum.service.impl;

import com.assignment.forum.constants.ForumStatus;
import com.assignment.forum.domain.Forum;
import com.assignment.forum.dto.ForumDTO;
import com.assignment.forum.repository.ForumCategoryRepository;
import com.assignment.forum.repository.ForumRepository;
import com.assignment.forum.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForumServiceImpl implements ForumService {

    @Autowired
    ForumRepository forumRepository;
    @Autowired
    ForumCategoryRepository forumCategoryRepository;

    @Override
    public ForumDTO createArticle(ForumDTO forum) {
        return forumToForumDTO(forumRepository.save(forumDTOToForum(forum)));
    }

    @Override
    public List<ForumDTO> getArticle(Long forumId, String formStatus) {
        if(forumId!=null)
            return List.of(forumToForumDTO(forumRepository.findById(forumId).orElseThrow()));
        if(formStatus!=null)
            return forumRepository.findAll().stream()
                    .filter(forum -> forum.getForumStatus().equals(ForumStatus.valueOf(formStatus)))
                    .map(ForumServiceImpl::forumToForumDTO)
                    .collect(Collectors.toList());
        return forumRepository.findAll()
                .stream().map(ForumServiceImpl::forumToForumDTO).collect(Collectors.toList());
    }

    @Override
    public ForumDTO updateArticle(Long id, ForumDTO forumDTO) {
        Forum forum = forumRepository.findById(id).orElseThrow();
        forum.setTitle(forumDTO.getTitle());
        forum.setContent(forumDTO.getContent());
        forum.setUserId(forumDTO.getUserId());
        forum.setForumStatus(forumDTO.getForumStatus());
        forum.setForumCategory(this.forumCategoryRepository
                .findById(forumDTO.getForumCategory()).orElseThrow());
        return forumToForumDTO(forumRepository.save(forum));
    }

    @Override
    public String deleteArticle(Long forumId) {
        if(forumId==null) forumRepository.deleteAll();
        else
            forumRepository.deleteById(forumId);
        return "success";
    }

    private Forum forumDTOToForum(ForumDTO forumDTO){
        if(forumDTO==null) return null;
        Forum forum=new Forum();
        forum.setId(forumDTO.getId());
        forum.setTitle(forumDTO.getTitle());
        forum.setContent(forumDTO.getContent());
        forum.setUserId(forumDTO.getUserId());
        forum.setForumStatus(forumDTO.getForumStatus());
        forum.setForumCategory(this.forumCategoryRepository
                .findById(forumDTO.getForumCategory()).orElseThrow());
        return forum;
    }

    private static ForumDTO forumToForumDTO(Forum forum){
        if(forum==null) return null;
        ForumDTO forumDTO=new ForumDTO();
        forumDTO.setId(forum.getId());
        forumDTO.setTitle(forum.getTitle());
        forumDTO.setContent(forum.getContent());
        forumDTO.setUserId(forum.getUserId());
        forumDTO.setForumStatus(forum.getForumStatus());
        forumDTO.setForumCategory(forum.getForumCategory().getId());
        return forumDTO;
    }
}
