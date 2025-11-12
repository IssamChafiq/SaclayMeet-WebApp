// com/et4/app/controller/ConversationController.java
package com.et4.app.controller;

import com.et4.app.model.Conversation;
import com.et4.app.repository.ConversationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

@RestController
@RequestMapping("/api/conversations")
@CrossOrigin(origins = "http://localhost:5173")
public class ConversationController {

    private final ConversationRepository conversationRepo;

    public ConversationController(ConversationRepository conversationRepo) {
        this.conversationRepo = conversationRepo;
    }

    public record ConversationDTO(Integer id, Integer activityId) {}

    @GetMapping("/by-activity/{activityId}")
    public ResponseEntity<ConversationDTO> getByActivity(@PathVariable Integer activityId) {
        Optional<Conversation> c = conversationRepo.findByActivity_Id(activityId);
        return c.map(conv -> ResponseEntity.ok(
                        new ConversationDTO(conv.getId(),
                                conv.getActivity() != null ? conv.getActivity().getId() : null)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
