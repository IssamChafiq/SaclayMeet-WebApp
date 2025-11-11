package com.et4.app.controller;

import com.et4.app.model.Activity;
import com.et4.app.model.ActivityStatus;
import com.et4.app.model.Tag;
import com.et4.app.model.User;
import com.et4.app.repository.ActivityRepository;
import com.et4.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

    // ===== DTOs =====
    public static class ActivityDto {
        public Integer id;
        public String title;
        public String description;
        public String location;
        public String imageUrl;             // materialized while TX is open
        public LocalDateTime startTime;
        public LocalDateTime endTime;
        public Integer capacity;
        public ActivityStatus status;
        public LocalDateTime createdAt;
        public Integer organizerId;
        public String organizerName;
        public Set<String> tags;
        public List<Integer> participantIds;
    }

    private ActivityDto toDto(Activity a) {
        ActivityDto d = new ActivityDto();
        d.id = a.getId();
        d.title = a.getTitle();
        d.description = a.getDescription();
        d.location = a.getLocation();

        // IMPORTANT: reading the LOB within an open transaction
        d.imageUrl = a.getImageUrl();

        d.startTime = a.getStartTime();
        d.endTime = a.getEndTime();
        d.capacity = a.getCapacity();
        d.status = a.getStatus();
        d.createdAt = a.getCreatedAt();
        if (a.getOrganizer() != null) {
            d.organizerId = a.getOrganizer().getId();
            String first = Optional.ofNullable(a.getOrganizer().getFirstName()).orElse("");
            String last  = Optional.ofNullable(a.getOrganizer().getLastName()).orElse("");
            d.organizerName = (first + " " + last).trim();
        }
        d.tags = a.getTags() == null ? Collections.emptySet()
                : a.getTags().stream().map(Enum::name).collect(Collectors.toCollection(LinkedHashSet::new));
        d.participantIds = a.getParticipantIds() == null ? List.of() : new ArrayList<>(a.getParticipantIds());
        return d;
    }

    // ===== Payloads =====
    public static class CreateActivityRequest {
        public String title;
        public String description;
        public String location;
        public String imageUrl;     // Base64 data URL (starts with "data:image/")
        public String startTime;    // "YYYY-MM-DDTHH:mm:ss"
        public String endTime;      // "YYYY-MM-DDTHH:mm:ss"
        public Integer capacity;
        public Integer organizerId;
        public List<String> tags;   // ["Study","Sport"]
    }

    public static class UpdateActivityRequest {
        public String title;
        public String description;
        public String location;
        public String imageUrl;     // optional; blank => clear
        public String startTime;
        public String endTime;
        public Integer capacity;
        public String status;       // POSTED | EXPIRED | CANCELED
        public List<String> tags;
    }

    public static class JoinRequest { public Integer userId; }

    private Set<Tag> toTagSet(List<String> raw) {
        if (raw == null) return new HashSet<>();
        return raw.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(Tag::valueOf)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    // ===== Create =====
    @PostMapping
    @Transactional
    public ResponseEntity<?> create(@RequestBody CreateActivityRequest req) {
        if (req.organizerId == null) return ResponseEntity.badRequest().body("OrganizerId required");
        Optional<User> organizerOpt = userRepository.findById(req.organizerId);
        if (organizerOpt.isEmpty()) return ResponseEntity.badRequest().body("Organizer not found");

        Activity a = new Activity();
        a.setTitle(req.title);
        a.setDescription(req.description);
        a.setLocation(req.location);

        // Only accept image data URLs (defensive)
        if (req.imageUrl != null && req.imageUrl.startsWith("data:image/")) {
            a.setImageUrl(req.imageUrl);
        } else {
            a.setImageUrl(null);
        }

        a.setCapacity(req.capacity);
        a.setOrganizer(organizerOpt.get());
        a.setCreatedAt(LocalDateTime.now());
        a.setStatus(ActivityStatus.POSTED);

        if (req.startTime != null && !req.startTime.isBlank())
            a.setStartTime(LocalDateTime.parse(req.startTime));
        if (req.endTime != null && !req.endTime.isBlank())
            a.setEndTime(LocalDateTime.parse(req.endTime));

        a.setTags(toTagSet(req.tags));

        Activity saved = activityRepository.save(a);
        return ResponseEntity.ok(toDto(saved));
    }

    // ===== Update =====
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody UpdateActivityRequest req) {
        Optional<Activity> opt = activityRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Activity a = opt.get();

        if (req.title != null) a.setTitle(req.title);
        if (req.description != null) a.setDescription(req.description);
        if (req.location != null) a.setLocation(req.location);

        if (req.imageUrl != null) {
            if (req.imageUrl.isBlank()) {
                a.setImageUrl(null);
            } else if (req.imageUrl.startsWith("data:image/")) {
                a.setImageUrl(req.imageUrl);
            }
        }

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
        return ResponseEntity.ok(toDto(saved));
    }

    // ===== Cancel (soft delete) =====
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> cancel(@PathVariable Integer id) {
        Optional<Activity> opt = activityRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Activity a = opt.get();
        if (a.getStatus() != ActivityStatus.CANCELED) {
            a.setStatus(ActivityStatus.CANCELED);
            activityRepository.save(a);
        }
        return ResponseEntity.ok(toDto(a));
    }

    // ===== Join / Leave =====
    @PostMapping("/{activityId}/join")
    @Transactional
    public ResponseEntity<?> join(@PathVariable Integer activityId, @RequestBody JoinRequest req) {
        Optional<Activity> opt = activityRepository.findById(activityId);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Activity a = opt.get();
        if (req.userId != null) a.addParticipant(req.userId);
        return ResponseEntity.ok(toDto(activityRepository.save(a)));
    }

    @PostMapping("/{activityId}/leave")
    @Transactional
    public ResponseEntity<?> leave(@PathVariable Integer activityId, @RequestBody JoinRequest req) {
        Optional<Activity> opt = activityRepository.findById(activityId);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Activity a = opt.get();
        if (req.userId != null) a.removeParticipant(req.userId);
        return ResponseEntity.ok(toDto(activityRepository.save(a)));
    }

    // ===== Reads (keep TX open to finish LOB reads, then map to DTOs) =====
    @GetMapping
    @Transactional(readOnly = true)
    public List<ActivityDto> listAll() {
        return activityRepository
                .findAllByStatusNotOrderByCreatedAtDesc(ActivityStatus.CANCELED)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getOne(@PathVariable Integer id) {
        return activityRepository.findById(id)
                .map(a -> ResponseEntity.ok(toDto(a)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/joined/{userId}")
    @Transactional(readOnly = true)
    public List<ActivityDto> listJoinedByUser(@PathVariable Integer userId) {
        return activityRepository.findByParticipantIdsContains(userId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/organizer/{organizerId}")
    @Transactional(readOnly = true)
    public List<ActivityDto> listByOrganizer(@PathVariable Integer organizerId) {
        return activityRepository.findByOrganizer_Id(organizerId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @GetMapping("/search")
    @Transactional(readOnly = true)
    public List<ActivityDto> search(
            @RequestParam(required = false) String tags,
            @RequestParam(required = false) String after,
            @RequestParam(required = false) String before
    ) {
        List<Activity> base = activityRepository.findAllByStatusNotOrderByCreatedAtDesc(ActivityStatus.CANCELED);

        if (tags != null && !tags.isBlank()) {
            Set<Tag> wanted = Arrays.stream(tags.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Tag::valueOf)
                    .collect(Collectors.toCollection(LinkedHashSet::new));

            base = base.stream()
                    .filter(a -> a.getTags() != null && a.getTags().stream().anyMatch(wanted::contains))
                    .collect(Collectors.toList());
        }

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

        return base.stream().map(this::toDto).collect(Collectors.toList());
    }
}
