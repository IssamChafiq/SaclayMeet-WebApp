package com.et4.app.controller;

import com.et4.app.model.Image;
import com.et4.app.model.User;
import com.et4.app.repository.ImageRepository;
import com.et4.app.repository.UserRepository;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    public UserController(UserRepository userRepository, ImageRepository imageRepository) {
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
    }

    // -------- DTOs --------

    public static class RegisterRequest {
        public String firstName;
        public String lastName;
        public String email;
        public String password;
        public String school;
        public String bio;
        public String level;
        public String birthDate; // ISO: "YYYY-MM-DD"
    }

    public static class LoginRequest {
        public String email;
        public String password;
    }

    public static class UpdateUserRequest {
        public String firstName;
        public String lastName;
        public String email; // optional; if you allow it
        public String facebookAccount;
        public String instagramAccount;
        public String snapchatAccount;
        public String linkedinAccount;

        // new profile fields
        public String school;
        public String bio;
        public String level;
        public String birthDate; // ISO or empty to clear
    }

    public static class DataUrlPayload {
        public String dataUrl; // "data:image/png;base64,AAAA..."
    }

    // -------- Helpers --------

    private static String safe(String v) { return v == null ? "" : v; }

    private static LocalDate parseDateOrNull(String s) {
        if (s == null) return null;
        String t = s.trim();
        if (t.isEmpty()) return null;
        return LocalDate.parse(t);
    }

    private static String emptyToNull(String s) {
        if (s == null) return null;
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }

    private static Map<String, Object> toUserPayload(User u) {
        String profileImageUrl = null;
        if (u.getProfileImage() != null && u.getProfileImage().getId() != null) {
            profileImageUrl = "/api/images/" + u.getProfileImage().getId();
        }
        Map<String, Object> m = new HashMap<>();
        m.put("id", u.getId());
        m.put("firstName", u.getFirstName());
        m.put("lastName", u.getLastName());
        m.put("email", u.getEmail());
        m.put("facebookAccount", safe(u.getFacebookAccount()));
        m.put("instagramAccount", safe(u.getInstagramAccount()));
        m.put("snapchatAccount", safe(u.getSnapchatAccount()));
        m.put("linkedinAccount", safe(u.getLinkedinAccount()));
        m.put("profileImageUrl", profileImageUrl);

        // new fields
        m.put("school", safe(u.getSchool()));
        m.put("bio", safe(u.getBio()));
        m.put("level", safe(u.getLevel()));
        m.put("birthDate", u.getBirthDate() != null ? u.getBirthDate().toString() : null);
        return m;
    }

    // -------- Auth-ish --------

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (req.email == null || req.password == null ||
                req.firstName == null || req.lastName == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }
        if (userRepository.existsByEmail(req.email.trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use");
        }

        User u = new User();
        u.setFirstName(req.firstName.trim());
        u.setLastName(req.lastName.trim());
        u.setEmail(req.email.trim());
        u.setPassword(req.password); // hash in real life

        // new fields
        u.setSchool(emptyToNull(req.school));
        u.setBio(emptyToNull(req.bio));
        u.setLevel(emptyToNull(req.level));
        u.setBirthDate(parseDateOrNull(req.birthDate));

        userRepository.save(u);
        return ResponseEntity.ok(Map.of("id", u.getId(), "email", u.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req.email == null || req.password == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");
        }
        Optional<User> userOpt = userRepository.findByEmail(req.email.trim());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");
        }
        User u = userOpt.get();
        if (!u.getPassword().equals(req.password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");
        }
        return ResponseEntity.ok(Map.of("id", u.getId(), "email", u.getEmail()));
    }

    // -------- Read --------

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Integer id) {
        return userRepository.findById(id)
                .map(u -> ResponseEntity.ok(toUserPayload(u))) // Map<String,Object>
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found"))); // Map<String,Object>
    }


    // (Optional) list minimal users
    @GetMapping
    public ResponseEntity<?> listAll() {
        return ResponseEntity.ok(
                userRepository.findAll().stream().map(UserController::toUserPayload).toList()
        );
    }

    // -------- Update --------

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ResponseEntity<?> update(
            @PathVariable Integer id,
            @RequestBody UpdateUserRequest req
    ) {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");

        if (req.firstName != null) user.setFirstName(req.firstName.trim());
        if (req.lastName != null) user.setLastName(req.lastName.trim());

        if (req.email != null && !req.email.isBlank()) {
            String newEmail = req.email.trim();
            if (!newEmail.equalsIgnoreCase(user.getEmail()) && userRepository.existsByEmail(newEmail)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use");
            }
            user.setEmail(newEmail);
        }

        user.setFacebookAccount(emptyToNull(req.facebookAccount));
        user.setInstagramAccount(emptyToNull(req.instagramAccount));
        user.setSnapchatAccount(emptyToNull(req.snapchatAccount));
        user.setLinkedinAccount(emptyToNull(req.linkedinAccount));

        // new fields
        if (req.school != null) user.setSchool(emptyToNull(req.school));
        if (req.bio != null) user.setBio(emptyToNull(req.bio));
        if (req.level != null) user.setLevel(emptyToNull(req.level));
        if (req.birthDate != null) user.setBirthDate(parseDateOrNull(req.birthDate));

        userRepository.save(user);
        return ResponseEntity.ok(toUserPayload(user));
    }

    // -------- Profile Image (Data URL) --------

    @PutMapping(value = "/{id}/profile-image", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ResponseEntity<?> updateProfileImage(
            @PathVariable Integer id,
            @RequestBody DataUrlPayload body
    ) {
        var user = userRepository.findById(id).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        if (body == null || body.dataUrl == null || body.dataUrl.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing dataUrl"));
        }

        String dataUrl = body.dataUrl.trim();
        int comma = dataUrl.indexOf(',');
        if (!dataUrl.startsWith("data:") || comma < 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid data URL"));
        }
        String meta = dataUrl.substring(5, comma); // e.g. "image/png;base64"
        String base64 = dataUrl.substring(comma + 1);

        byte[] bytes;
        try {
            bytes = Base64.getDecoder().decode(base64);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Bad base64 payload"));
        }

        String contentType = "application/octet-stream";
        int sc = meta.indexOf(';');
        if (sc > 0) contentType = meta.substring(0, sc);
        else if (!meta.isBlank()) contentType = meta;

        Image img = user.getProfileImage();
        if (img == null) img = new Image();
        img.setContent(bytes);
        img.setContentType(contentType);
        imageRepository.save(img);

        user.setProfileImage(img);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "imageId", img.getId(),
                "profileImageUrl", "/api/images/" + img.getId()
        ));
    }
}
