package com.et4.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "socials")
public class SocialAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Platform platform;

    private String handle;
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Platform getPlatform() { return platform; }
    public void setPlatform(Platform platform) { this.platform = platform; }

    public String getHandle() { return handle; }
    public void setHandle(String handle) { this.handle = handle; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
