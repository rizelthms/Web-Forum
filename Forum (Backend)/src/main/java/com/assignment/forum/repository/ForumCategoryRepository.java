package com.assignment.forum.repository;

import com.assignment.forum.domain.ForumCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumCategoryRepository extends JpaRepository<ForumCategory,Integer> {
}
