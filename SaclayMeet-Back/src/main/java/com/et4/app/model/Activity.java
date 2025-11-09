package com.et4.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Activity entity used by the UI (listings, details, etc.)
 * Key fix: @JsonIgnore on 'conversation' to prevent infinite JSON recursion
 * once a Conversation is linked to this Activity.
 */
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

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    private ActivityStatus status;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "organizer_id")
    private User organizer;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToOne
    @JoinColumn(name = "image_id")
    private Image image;

    // If Registration has a back-reference to Activity, consider @JsonIgnore here too
    @OneToMany(mappedBy = "activity")
    private List<Registration> registrations = new ArrayList<>();

    /**
     * IMPORTANT:
     * Your Conversation entity MUST have the owning side:
     *   @OneToOne
     *   @JoinColumn(name = "activity_id", unique = true, nullable = false)
     *   private Activity activity;
     *
     * And here, since Activity is the inverse side (mappedBy = "activity"),
     * we ignore it in JSON to avoid recursion when serializing Activity.
     */
    @OneToOne(mappedBy = "activity")
    @JsonIgnore
    private Conversation conversation;

    // participants as user IDs (denormalized for quick checks in the UI)
    @ElementCollection
    @CollectionTable(name = "activity_participants", joinColumns = @JoinColumn(name = "activity_id"))
    @Column(name = "user_id")
    private List<Integer> participantIds = new ArrayList<>();

    // TAGS: set of enums, persisted as strings in a separate table
    @ElementCollection(targetClass = Tag.class)
    @CollectionTable(name = "activity_tags", joinColumns = @JoinColumn(name = "activity_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "tag")
    private Set<Tag> tags = new HashSet<>();

    // --- Lifecycle ---

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    // --- Getters & Setters ---

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

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

    public Set<Tag> getTags() { return tags; }
    public void setTags(Set<Tag> tags) { this.tags = tags; }

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
