// com/et4/app/repository/ConversationRepository.java
package com.et4.app.repository;

import com.et4.app.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import com.et4.app.model.Conversation;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
public interface  ConversationRepository extends JpaRepository<Conversation, Integer> {
    Optional<Conversation> findByActivity_Id(Integer activityId);
    boolean existsByActivity_Id(Integer activityId);

    @Modifying
    @Query(
            value = """
              INSERT INTO conversations (activity_id, created_at)
              VALUES (:activityId, NOW())
              ON CONFLICT (activity_id) DO NOTHING
              """,
            nativeQuery = true
    )
    int insertIfAbsent(@Param("activityId") Integer activityId);
}
