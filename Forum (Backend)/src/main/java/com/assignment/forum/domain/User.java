package com.assignment.forum.domain;

import com.assignment.forum.constants.UserRole;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    @NotBlank
    private String userName;
    @NotBlank
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    Boolean isActive;
    @OneToMany(mappedBy = "userId")
    List<Forum> forumList;
}
