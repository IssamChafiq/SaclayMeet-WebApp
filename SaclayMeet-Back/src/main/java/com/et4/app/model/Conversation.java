package com.et4.app.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * One Conversation per Activity.
 * Owning side of the @OneToOne that Activity(mappedBy="activity") expects.
 */
@Entity
@Table(name = "conversations")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // <-- THIS is what Activity.mappedBy("activity") points to
    @OneToOne
    @JoinColumn(name = "activity_id", unique = true, nullable = false)
    private Activity activity;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Conversation() {}

    public Integer getId() { return id; }

    public Activity getActivity() { return activity; }
    public void setActivity(Activity activity) { this.activity = activity; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
