package com.et4.app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users") // keep your existing table name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(length = 255, unique = true, nullable = false)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "school_name", length = 255)
    private String schoolName;

    @Column(length = 50)
    private String level;

    @Column(columnDefinition = "TEXT")
    private String bio;

    // Optional simple URL for avatars (you can keep using this)
    @Column(name = "profile_image_url", length = 1000)
    private String profileImageUrl;

    // ---- RESTORE THIS: owner side of the 1–1 expected by Image.user(mappedBy="image")
    @OneToOne
    @JoinColumn(name = "image_id") // nullable is fine
    private Image image;

    // ---- Socials (nullable)
    @Column(length = 255)
    private String facebook;

    @Column(length = 255)
    private String instagram;

    @Column(length = 255)
    private String snapchat;

    @Column(length = 255)
    private String linkedin;

    public User() {}

    // ===== Getters / Setters =====
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public LocalDate getBirthDate() { return birthDate; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

    public String getSchoolName() { return schoolName; }
    public void setSchoolName(String schoolName) { this.schoolName = schoolName; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getProfileImageUrl() { return profileImageUrl; }
    public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }

    public Image getImage() { return image; }
    public void setImage(Image image) { this.image = image; }

    public String getFacebook() { return facebook; }
    public void setFacebook(String facebook) { this.facebook = facebook; }

    public String getInstagram() { return instagram; }
    public void setInstagram(String instagram) { this.instagram = instagram; }

    public String getSnapchat() { return snapchat; }
    public void setSnapchat(String snapchat) { this.snapchat = snapchat; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }
}
