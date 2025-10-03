package com.et4.app.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.*;

@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", length = 500)
    private String firstName;

    @Column(name = "last_name", length = 500)
    private String lastName;

    @Column(length = 500, unique = true)
    private String email;

    private String password;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    private String schoolName;
    private String level;

    @Column(columnDefinition = "TEXT")
    private String bio;

    // One-to-one with image
    @OneToOne
    @JoinColumn(name = "image_id")
    private Image image;

    // One-to-many relationships
    @OneToMany(mappedBy = "organizer")
    private List<Activity> activities = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<SocialAccount> socials = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Message> messages = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Registration> registrations = new ArrayList<>();

    // ======= GETTERS & SETTERS =======

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setSchoolName(String school) {
        this.schoolName = school;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public void setSocials(List<SocialAccount> socials) {
        this.socials = socials;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void setRegistrations(List<Registration> registrations) {
        this.registrations = registrations;
    }
}
