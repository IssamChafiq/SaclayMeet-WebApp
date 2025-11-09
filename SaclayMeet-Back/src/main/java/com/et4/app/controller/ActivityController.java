package com.et4.app.controller;

import com.et4.app.model.*;
import com.et4.app.repository.ActivityRepository;
import com.et4.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:5173")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private UserRepository userRepository;

    // DTOs
    public static class CreateActivityRequest {
        public String title;
        public String description;
        public String location;
        public String imageUrl;
        public String startTime; // "YYYY-MM-DDTHH:mm:ss"
        public String endTime;   // "YYYY-MM-DDTHH:mm:ss"
        public Integer capacity;
        public Integer organizerId;
        public List<String> tags; // e.g. ["Study","Sport"]
    }

    public static class UpdateActivityRequest {
        public String title;
        public String description;
        public String location;
        public String imageUrl;
        public String startTime;
        public String endTime;
        public Integer capacity;
        public String status;
        public List<String> tags; // optional
    }

    public static class JoinRequest {
        public Integer userId;
    }

    private Set<Tag> toTagSet(List<String> raw) {
        if (raw == null) return new HashSet<>();
        return raw.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(Tag::valueOf) // relies on exact enum names
                .collect(Collectors.toSet());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateActivityRequest req) {
        Optional<User> organizerOpt = userRepository.findById(req.organizerId);
        if (organizerOpt.isEmpty()) return ResponseEntity.badRequest().body("Organizer not found");

        Activity a = new Activity();
        a.setTitle(req.title);
        a.setDescription(req.description);
        a.setLocation(req.location);
        a.setImageUrl(req.imageUrl);
        a.setCapacity(req.capacity);
        a.setOrganizer(organizerOpt.get());
        a.setCreatedAt(LocalDateTime.now());

        if (req.startTime != null && !req.startTime.isBlank())
            a.setStartTime(LocalDateTime.parse(req.startTime));
        if (req.endTime != null && !req.endTime.isBlank())
            a.setEndTime(LocalDateTime.parse(req.endTime));

        a.setTags(toTagSet(req.tags));

        Activity saved = activityRepository.save(a);
        return ResponseEntity.ok(saved);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody UpdateActivityRequest req) {
        Optional<Activity> opt = activityRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Activity a = opt.get();

        if (req.title != null) a.setTitle(req.title);
        if (req.description != null) a.setDescription(req.description);
        if (req.location != null) a.setLocation(req.location);
        if (req.imageUrl != null) a.setImageUrl(req.imageUrl);
        if (req.capacity != null) a.setCapacity(req.capacity);

        if (req.startTime != null && !req.startTime.isBlank())
            a.setStartTime(LocalDateTime.parse(req.startTime));
        if (req.endTime != null && !req.endTime.isBlank())
            a.setEndTime(LocalDateTime.parse(req.endTime));

        if (req.status != null && !req.status.isBlank())
            a.setStatus(Enum.valueOf(ActivityStatus.class, req.status));

        if (req.tags != null)
            a.setTags(toTagSet(req.tags));

        Activity saved = activityRepository.save(a);
        return ResponseEntity.ok(saved);
    }

    // LIST ALL (newest first)
    @GetMapping
    public List<Activity> listAll() {
        return activityRepository.findAllByOrderByCreatedAtDesc();
    }

    // GET ONE
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Integer id) {
        return activityRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // JOIN
    @PostMapping("/{activityId}/join")
    public ResponseEntity<?> join(@PathVariable Integer activityId, @RequestBody JoinRequest req) {
        Optional<Activity> opt = activityRepository.findById(activityId);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        Activity a = opt.get();
        a.addParticipant(req.userId);
        Activity saved = activityRepository.save(a);
        return ResponseEntity.ok(saved);
    }

    // LIST JOINED BY USER
    @GetMapping("/joined/{userId}")
    public List<Activity> listJoinedByUser(@PathVariable Integer userId) {
        return activityRepository.findByParticipantIdsContains(userId);
    }

    // LIST BY ORGANIZER
    @GetMapping("/organizer/{organizerId}")
    public List<Activity> listByOrganizer(@PathVariable Integer organizerId) {
        return activityRepository.findByOrganizer_Id(organizerId);
    }

    // SEARCH by tags + date range (all optional)
    // Example: /api/activities/search?tags=Study,Party&after=2025-12-01T00:00:00&before=2025-12-31T23:59:59
    @GetMapping("/search")
    public List<Activity> search(
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) String after,
            @RequestParam(required = false) String before
    ) {
        List<Activity> base = activityRepository.findAllByOrderByCreatedAtDesc();

        // filter by tags (ANY match)
        if (tags != null && !tags.isBlank()) {
            Set<Tag> wanted = Arrays.stream(tags.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Tag::valueOf)
                    .collect(Collectors.toSet());

            base = base.stream()
                    .filter(a -> {
                        if (a.getTags() == null || a.getTags().isEmpty()) return false;
                        for (Tag t : a.getTags()) {
                            if (wanted.contains(t)) return true;
                        }
                        return false;
                    })
                    .collect(Collectors.toList());
        }

        // filter by date range
        LocalDateTime afterDt = (after != null && !after.isBlank()) ? LocalDateTime.parse(after) : null;
        LocalDateTime beforeDt = (before != null && !before.isBlank()) ? LocalDateTime.parse(before) : null;

        if (afterDt != null) {
            base = base.stream()
                    .filter(a -> a.getStartTime() != null && !a.getStartTime().isBefore(afterDt))
                    .collect(Collectors.toList());
        }
        if (beforeDt != null) {
            base = base.stream()
                    .filter(a -> a.getStartTime() != null && !a.getStartTime().isAfter(beforeDt))
                    .collect(Collectors.toList());
        }

        return base;
    }
}
