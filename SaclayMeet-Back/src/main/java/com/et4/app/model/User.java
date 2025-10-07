package com.et4.app.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users") // nom de la table dans la base
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // même type que dans UserRepository

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(length = 255, unique = true)
    private String email;

    @Column(length = 255)
    private String password;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "school_name", length = 255)
    private String schoolName;

    @Column(length = 50)
    private String level;

    @Column(columnDefinition = "TEXT")
    private String bio;

    // ✅ Relation 1-to-1 avec Image
    @OneToOne
    @JoinColumn(name = "image_id") // clé étrangère dans la table "users"
    private Image image;

    // ===== Constructeurs =====
    public User() {}

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // ===== Getters =====
    public Integer getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public LocalDate getBirthDate() { return birthDate; }
    public String getSchoolName() { return schoolName; }
    public String getLevel() { return level; }
    public String getBio() { return bio; }
    public Image getImage() { return image; }

    // ===== Setters =====
    public void setId(Integer id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
    public void setSchoolName(String schoolName) { this.schoolName = schoolName; }
    public void setLevel(String level) { this.level = level; }
    public void setBio(String bio) { this.bio = bio; }
    public void setImage(Image image) { this.image = image; }
}
