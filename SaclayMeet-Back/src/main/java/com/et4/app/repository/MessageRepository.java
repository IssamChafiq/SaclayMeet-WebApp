package com.et4.app.repository;

import com.et4.app.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    // this matches what the front needs: messages for an activity, oldest first
    List<Message> findByConversation_Activity_IdOrderBySentAtAsc(Integer activityId);
}
