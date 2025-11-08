package com.et4.app.controller;

import com.et4.app.model.Activity;
import com.et4.app.model.User;
import com.et4.app.repository.ActivityRepository;
import com.et4.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:5173")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserRepository userRepository;

    // Minimal DTOs (kept simple)
    public static class CreateActivityRequest {
        public String title;
        public String description;
        public String location;
        public String startTime;   // "YYYY-MM-DDTHH:mm:ss"
        public String endTime;     // "YYYY-MM-DDTHH:mm:ss"
        public Integer capacity;
        public Integer organizerId;
    }

    public static class JoinRequest {
        public Integer userId;
    }

    // 1) Create activity
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateActivityRequest req) {
        Optional<User> organizerOpt = userRepository.findById(req.organizerId);
        if (organizerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Organizer not found");
        }
        Activity a = new Activity();
        a.setTitle(req.title);
        a.setDescription(req.description);
        a.setLocation(req.location);
        a.setCapacity(req.capacity);
        a.setOrganizer(organizerOpt.get());
        a.setCreatedAt(LocalDateTime.now());

        if (req.startTime != null && !req.startTime.isBlank()) {
            a.setStartTime(LocalDateTime.parse(req.startTime));
        }
        if (req.endTime != null && !req.endTime.isBlank()) {
            a.setEndTime(LocalDateTime.parse(req.endTime));
        }

        Activity saved = activityRepository.save(a);
        return ResponseEntity.ok(saved);
    }

    // 2) List all
    @GetMapping
    public List<Activity> listAll() {
        return activityRepository.findAll();
        // ou le plus recent en premier
        // return activityRepository.findAllByOrderByCreatedAtDesc();
    }

    // 3) Get one
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Integer id) {
        Optional<Activity> opt = activityRepository.findById(id);
        return opt.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4) Join an activity (adds userId to participantIds)
    @PostMapping("/{activityId}/join")
    public ResponseEntity<?> join(@PathVariable Integer activityId, @RequestBody JoinRequest req) {
        Optional<Activity> opt = activityRepository.findById(activityId);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Activity a = opt.get();
        a.addParticipant(req.userId);
        Activity saved = activityRepository.save(a);
        return ResponseEntity.ok(saved);
    }

    // 5) List activities joined by a user
    @GetMapping("/joined/{userId}")
    public List<Activity> listJoinedByUser(@PathVariable Integer userId) {
        return activityRepository.findByParticipantIdsContains(userId);
    }

    // (optional) 6) List activities organized by a user
    @GetMapping("/organizer/{organizerId}")
    public List<Activity> listByOrganizer(@PathVariable Integer organizerId) {
        return activityRepository.findByOrganizer_Id(organizerId);
    }
}
