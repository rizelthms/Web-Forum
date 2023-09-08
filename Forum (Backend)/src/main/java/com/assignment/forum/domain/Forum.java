package com.assignment.forum.domain;

import com.assignment.forum.constants.ForumStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "forum")
public class Forum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @ManyToOne
    @JoinColumn(name = "forum_category_id")
    private ForumCategory forumCategory;

    @Enumerated(EnumType.STRING)
    ForumStatus forumStatus;

    private Long userId;
}
