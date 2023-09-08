package com.assignment.forum.dto;

import com.assignment.forum.constants.ForumStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
public class ForumDTO {
    private Long id;
    private String title;
    private String content;
    Integer forumCategory;
    @Enumerated(EnumType.STRING)
    ForumStatus forumStatus;
    private Long userId;
}
