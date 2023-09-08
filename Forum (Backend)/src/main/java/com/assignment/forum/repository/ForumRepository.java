package com.assignment.forum.repository;

import com.assignment.forum.domain.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumRepository extends JpaRepository<Forum,Long> {
    Optional<Forum> findById(Long id);
    List<Forum> findAll();
}
