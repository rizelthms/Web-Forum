package com.assignment.forum.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Entity
@Table(name = "forum_category")
public class ForumCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank
    private String categoryName;
    @Transient
    private Integer count;

    public void incrementCount(){
        if(this.count==null) this.count=1;
        else this.count++;
    }
}
