package com.et4.app.repository;

import com.et4.app.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    // list messages in a conversation ordered by time
    List<Message> findByConversationIdOrderBySentAtAsc(Integer conversationId);

    // convenience if you want to fetch directly by activity
    List<Message> findByConversation_Activity_IdOrderBySentAtAsc(Integer activityId);
}
