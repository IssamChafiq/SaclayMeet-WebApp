package com.et4.app.controller;

import com.et4.app.model.*;
import com.et4.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    @Autowired private MessageRepository messageRepository;
    @Autowired private ConversationRepository conversationRepository;
    @Autowired private ActivityRepository activityRepository;
    @Autowired private UserRepository userRepository;

    // Simple DTOs to keep payloads small
    public record NewMessageReq(Integer userId, String body) {}
    public record MessageDTO(Integer id, Integer userId, String userName, String body, LocalDateTime sentAt) {}
    public record ConversationDTO(Integer id, Integer activityId) {}

    // Ensure a conversation exists for an activity, and return it
    @PostMapping("/ensure-conversation/{activityId}")
    public ResponseEntity<?> ensureConversation(@PathVariable Integer activityId) {
        Optional<Activity> actOpt = activityRepository.findById(activityId);
        if (actOpt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activity not found");

        Conversation conv = conversationRepository.findByActivityId(activityId)
                .orElseGet(() -> {
                    Conversation c = new Conversation();
                    c.setActivity(actOpt.get());
                    c.setCreatedAt(LocalDateTime.now());
                    return conversationRepository.save(c);
                });

        return ResponseEntity.ok(new ConversationDTO(conv.getId(), activityId));
    }

    // Get messages for an activity (ordered ASC)
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<?> listByActivity(@PathVariable Integer activityId) {
        List<Message> msgs = messageRepository.findByConversation_Activity_IdOrderBySentAtAsc(activityId);

        // If conversation doesn't exist yet, return empty list
        if (msgs.isEmpty()) {
            boolean convExists = conversationRepository.findByActivityId(activityId).isPresent();
            if (!convExists) return ResponseEntity.ok(Collections.emptyList());
        }

        List<MessageDTO> out = new ArrayList<>();
        for (Message m : msgs) {
            User u = m.getUser();
            String name = (u == null) ? "Unknown" : ( (u.getFirstName() == null ? "" : u.getFirstName()) + " " + (u.getLastName() == null ? "" : u.getLastName()) ).trim();
            out.add(new MessageDTO(m.getId(), u != null ? (Integer) (u.getId().intValue()) : null, name, m.getBody(), m.getSentAt()));
        }
        return ResponseEntity.ok(out);
    }

    // Post a message to an activity's conversation
    @PostMapping("/activity/{activityId}")
    public ResponseEntity<?> postToActivity(@PathVariable Integer activityId, @RequestBody NewMessageReq req) {
        if (req == null || req.userId() == null || req.body() == null || req.body().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("userId and body required");
        }

        Optional<Activity> actOpt = activityRepository.findById(activityId);
        if (actOpt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activity not found");

        Optional<User> userOpt = userRepository.findById(req.userId());
        if (userOpt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        // get or create conversation
        Conversation conv = conversationRepository.findByActivityId(activityId)
                .orElseGet(() -> {
                    Conversation c = new Conversation();
                    c.setActivity(actOpt.get());
                    c.setCreatedAt(LocalDateTime.now());
                    return conversationRepository.save(c);
                });

        Message m = new Message();
        m.setConversation(conv);
        m.setUser(userOpt.get());
        m.setBody(req.body());
        m.setSentAt(LocalDateTime.now());

        Message saved = messageRepository.save(m);

        User u = saved.getUser();
        String name = (u == null) ? "Unknown" : ( (u.getFirstName() == null ? "" : u.getFirstName()) + " " + (u.getLastName() == null ? "" : u.getLastName()) ).trim();
        MessageDTO dto = new MessageDTO(saved.getId(), u != null ? (Integer)(u.getId().intValue()) : null, name, saved.getBody(), saved.getSentAt());
        return ResponseEntity.ok(dto);
    }
}
