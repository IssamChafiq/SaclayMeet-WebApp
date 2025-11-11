package com.et4.app.controller;

import com.et4.app.model.User;
import com.et4.app.repository.UserRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserRepository users;

    public UserController(UserRepository users) {
        this.users = users;
    }

    // DTO (no password)
    public record UserDTO(Integer id, String email, String firstName, String lastName,
                          String birthDate, String schoolName, String level, String bio,
                          String facebook, String instagram, String snapchat, String linkedin,
                          String profileImageUrl) {}

    private static UserDTO toDTO(User u) {
        return new UserDTO(
                u.getId(),
                u.getEmail(),
                u.getFirstName(),
                u.getLastName(),
                u.getBirthDate() != null ? u.getBirthDate().toString() : null,
                u.getSchoolName(),
                u.getLevel(),
                u.getBio(),
                u.getFacebook(),
                u.getInstagram(),
                u.getSnapchat(),
                u.getLinkedin(),
                u.getProfileImageUrl()
        );
    }

    // ---------- REGISTER ----------
    public record RegisterRequest(String email, String password, String firstName, String lastName) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (req == null || req.email() == null || req.password() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing email or password");
        }
        String email = req.email().trim().toLowerCase();                // FIX: normalize
        if (email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing email or password");
        }
        if (users.existsByEmailIgnoreCase(email)) {                      // FIX: case-insensitive check
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email déjà utilisé");
        }
        User u = new User();
        u.setEmail(email);                                               // FIX: store normalized email
        u.setPassword(req.password()); // (no hashing, keeping your current behavior)
        u.setFirstName(req.firstName());
        u.setLastName(req.lastName());
        User saved = users.save(u);

        // FIX: return a consistent DTO so FE can pull names if needed
        return ResponseEntity.status(HttpStatus.CREATED).body(toDTO(saved));
    }

    // ---------- LOGIN ----------
    public record LoginRequest(String email, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req == null || req.email() == null || req.password() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing email or password");
        }
        String email = req.email().trim().toLowerCase();                 // FIX: normalize
        Optional<User> opt = users.findByEmailIgnoreCase(email);         // FIX: case-insensitive lookup
        if (opt.isEmpty() || !opt.get().getPassword().equals(req.password())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
        }
        return ResponseEntity.ok(toDTO(opt.get()));                      // FIX: return DTO (not Map)
    }

    // ---------- READ ----------
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Integer id) {
        return users.findById(id)
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(toDTO(u)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé"));
    }

    // ---------- UPDATE ----------
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        Optional<User> opt = users.findById(id);
        if (opt.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        User u = opt.get();

        if (body.containsKey("firstName")) u.setFirstName((String) body.get("firstName"));
        if (body.containsKey("lastName"))  u.setLastName((String) body.get("lastName"));
        if (body.containsKey("email")) {
            String newEmail = (String) body.get("email");
            if (newEmail != null) newEmail = newEmail.trim().toLowerCase();   // FIX: normalize on update too
            if (newEmail != null && !newEmail.equals(u.getEmail()) && users.existsByEmailIgnoreCase(newEmail)) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email déjà utilisé");
            }
            u.setEmail(newEmail);
        }
        if (body.containsKey("schoolName")) u.setSchoolName((String) body.get("schoolName"));
        if (body.containsKey("level"))      u.setLevel((String) body.get("level"));
        if (body.containsKey("bio"))        u.setBio((String) body.get("bio"));
        if (body.containsKey("facebook"))   u.setFacebook((String) body.get("facebook"));
        if (body.containsKey("instagram"))  u.setInstagram((String) body.get("instagram"));
        if (body.containsKey("snapchat"))   u.setSnapchat((String) body.get("snapchat"));
        if (body.containsKey("linkedin"))   u.setLinkedin((String) body.get("linkedin"));

        if (body.containsKey("birthDate")) {
            String bd = (String) body.get("birthDate");
            if (bd == null || bd.isBlank()) {
                u.setBirthDate(null);
            } else {
                u.setBirthDate(LocalDate.parse(bd)); // expect YYYY-MM-DD
            }
        }

        User saved = users.save(u);
        return ResponseEntity.ok(toDTO(saved));
    }
}
