package com.et4.app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Core identity
    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false)
    private String password;

    // Socials (optional)
    @Column(length = 255)
    private String facebookAccount;

    @Column(length = 255)
    private String instagramAccount;

    @Column(length = 255)
    private String snapchatAccount;

    @Column(length = 255)
    private String linkedinAccount;

    // Profile image as a LOB via Image entity
    @OneToOne
    @JoinColumn(name = "profile_image_id")
    private Image profileImage;

    // Additional info
    @Column(length = 255)
    private String school;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 50)
    private String level;

    private LocalDate birthDate;

    // ===== Constructors =====
    public User() {}

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    // ===== Getters =====
    public Integer getId() { return id; }

    public String getFirstName() { return firstName; }

    public String getLastName() { return lastName; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public String getFacebookAccount() { return facebookAccount; }

    public String getInstagramAccount() { return instagramAccount; }

    public String getSnapchatAccount() { return snapchatAccount; }

    public String getLinkedinAccount() { return linkedinAccount; }

    public Image getProfileImage() { return profileImage; }

    public String getSchool() { return school; }

    public String getBio() { return bio; }

    public String getLevel() { return level; }

    public LocalDate getBirthDate() { return birthDate; }

    // ===== Setters =====
    public void setId(Integer id) { this.id = id; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password; }

    public void setFacebookAccount(String facebookAccount) { this.facebookAccount = facebookAccount; }

    public void setInstagramAccount(String instagramAccount) { this.instagramAccount = instagramAccount; }

    public void setSnapchatAccount(String snapchatAccount) { this.snapchatAccount = snapchatAccount; }

    public void setLinkedinAccount(String linkedinAccount) { this.linkedinAccount = linkedinAccount; }

    public void setProfileImage(Image profileImage) { this.profileImage = profileImage; }

    public void setSchool(String school) { this.school = school; }

    public void setBio(String bio) { this.bio = bio; }

    public void setLevel(String level) { this.level = level; }

    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
}
