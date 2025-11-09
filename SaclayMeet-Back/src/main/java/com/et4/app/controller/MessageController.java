package com.et4.app.controller;

import com.et4.app.model.Activity;
import com.et4.app.model.Conversation;
import com.et4.app.model.Message;
import com.et4.app.repository.ActivityRepository;
import com.et4.app.repository.ConversationRepository;
import com.et4.app.repository.MessageRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    private final MessageRepository messageRepo;
    private final ConversationRepository conversationRepo;
    private final ActivityRepository activityRepo;

    public MessageController(MessageRepository messageRepo,
                             ConversationRepository conversationRepo,
                             ActivityRepository activityRepo) {
        this.messageRepo = messageRepo;
        this.conversationRepo = conversationRepo;
        this.activityRepo = activityRepo;
    }

    // ---- DTOs (exactly what the front expects) ----
    public record NewMessageReq(Integer userId, String body, String userName) {}
    public record MessageDTO(Integer id, Integer userId, String userName, String body, LocalDateTime sentAt) {}
    public record ConversationDTO(Integer id, Integer activityId) {}

    /**
     * Ensure a conversation exists for the given activityId.
     * Race-safe: if two requests try to create concurrently, one insert wins,
     * the other catches the unique-constraint exception and re-fetches.
     */
    @PostMapping("/ensure-conversation/{activityId}")
    @Transactional
    public ResponseEntity<?> ensureConversation(@PathVariable Integer activityId) {
        Activity act = activityRepo.findById(activityId).orElse(null);
        if (act == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activity not found");
        }

        // Fast path: already exists
        Conversation existing = conversationRepo.findByActivity_Id(activityId).orElse(null);
        if (existing != null) {
            return ResponseEntity.ok(new ConversationDTO(existing.getId(), activityId));
        }

        // Slow path: create; handle race with try/catch
        try {
            Conversation c = new Conversation();
            c.setActivity(act);
            c.setCreatedAt(LocalDateTime.now());
            Conversation saved = conversationRepo.saveAndFlush(c);
            return ResponseEntity.ok(new ConversationDTO(saved.getId(), activityId));
        } catch (DataIntegrityViolationException dup) {
            // Another request inserted first → re-fetch and return
            Conversation again = conversationRepo.findByActivity_Id(activityId)
                    .orElseThrow(() -> new IllegalStateException("Conversation present but not readable"));
            return ResponseEntity.ok(new ConversationDTO(again.getId(), activityId));
        }
    }

    /**
     * List all messages for an activity, ordered by sentAt asc.
     */
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<List<MessageDTO>> listByActivity(@PathVariable Integer activityId) {
        List<Message> msgs = messageRepo.findByConversation_Activity_IdOrderBySentAtAsc(activityId);
        List<MessageDTO> out = new ArrayList<>(msgs.size());
        for (Message m : msgs) {
            String name = (m.getUserName() == null || m.getUserName().isBlank())
                    ? (m.getUserId() == null ? "Unknown" : "User " + m.getUserId())
                    : m.getUserName();
            out.add(new MessageDTO(m.getId(), m.getUserId(), name, m.getBody(), m.getSentAt()));
        }
        return ResponseEntity.ok(out);
    }

    /**
     * Post a message into the activity's conversation.
     * Race-safe ensure, identical pattern as above.
     */
    @PostMapping("/activity/{activityId}")
    @Transactional
    public ResponseEntity<?> postToActivity(@PathVariable Integer activityId, @RequestBody NewMessageReq req) {
        if (req == null || req.userId() == null || req.body() == null || req.body().isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("userId and body are required");
        }

        Activity act = activityRepo.findById(activityId).orElse(null);
        if (act == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activity not found");
        }

        // Ensure conversation (race-safe)
        Conversation conv = conversationRepo.findByActivity_Id(activityId).orElse(null);
        if (conv == null) {
            try {
                Conversation c = new Conversation();
                c.setActivity(act);
                c.setCreatedAt(LocalDateTime.now());
                conv = conversationRepo.saveAndFlush(c);
            } catch (DataIntegrityViolationException dup) {
                conv = conversationRepo.findByActivity_Id(activityId)
                        .orElseThrow(() -> new IllegalStateException("Conversation present but not readable"));
            }
        }

        Message m = new Message();
        m.setConversation(conv);
        m.setUserId(req.userId());
        m.setUserName((req.userName() == null || req.userName().isBlank())
                ? "User " + req.userId()
                : req.userName());
        m.setBody(req.body());
        m.setSentAt(LocalDateTime.now());

        Message saved = messageRepo.save(m);
        MessageDTO dto = new MessageDTO(saved.getId(), saved.getUserId(), saved.getUserName(), saved.getBody(), saved.getSentAt());
        return ResponseEntity.ok(dto);
    }
}
