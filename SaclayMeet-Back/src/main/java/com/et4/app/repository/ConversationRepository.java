// com/et4/app/repository/ConversationRepository.java
package com.et4.app.repository;

import com.et4.app.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface    ConversationRepository extends JpaRepository<Conversation, Integer> {
    Optional<Conversation> findByActivity_Id(Integer activityId);
    boolean existsByActivity_Id(Integer activityId);
}
