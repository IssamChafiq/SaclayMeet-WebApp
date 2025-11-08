package com.et4.app.model;

import jakarta.persistence.*;
import java.time.*;
import java.util.*;

@Entity
@Table(name = "activity")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;


    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private ActivityStatus status;

    private LocalDateTime createdAt;

    // Relationships
    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToOne
    @JoinColumn(name = "image_id")
    private Image image;

    @OneToMany(mappedBy = "activity")
    private List<Registration> registrations = new ArrayList<>();

    @OneToOne(mappedBy = "activity")
    private Conversation conversation;

    // NEW: list of user IDs who joined this activity
    @ElementCollection
    @CollectionTable(
            name = "activity_participants",
            joinColumns = @JoinColumn(name = "activity_id")
    )
    @Column(name = "user_id")
    private List<Integer> participantIds = new ArrayList<>();

    // Getters & Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public ActivityStatus getStatus() { return status; }
    public void setStatus(ActivityStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public User getOrganizer() { return organizer; }
    public void setOrganizer(User organizer) { this.organizer = organizer; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Image getImage() { return image; }
    public void setImage(Image image) { this.image = image; }

    public List<Registration> getRegistrations() { return registrations; }
    public void setRegistrations(List<Registration> registrations) { this.registrations = registrations; }

    public Conversation getConversation() { return conversation; }
    public void setConversation(Conversation conversation) { this.conversation = conversation; }

    public List<Integer> getParticipantIds() { return participantIds; }
    public void setParticipantIds(List<Integer> participantIds) { this.participantIds = participantIds; }

    // Convenience (optional)
    public void addParticipant(Integer userId) {
        if (userId == null) return;
        if (!this.participantIds.contains(userId)) {
            this.participantIds.add(userId);
        }
    }
    public void removeParticipant(Integer userId) {
        if (userId == null) return;
        this.participantIds.remove(userId);
    }
}
