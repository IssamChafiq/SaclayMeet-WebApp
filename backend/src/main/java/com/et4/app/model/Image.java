package com.et4.app.model;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "storage_location", nullable = false)
    private StorageLocation storageLocation;

    private String directory;
    private String url;

    // Relation with User
    @OneToOne(mappedBy = "image")
    private User user;

    // Relation with Activity
    @OneToOne(mappedBy = "image")
    private Activity activity;

    // Getters & Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public StorageLocation getStorageLocation() { return storageLocation; }
    public void setStorageLocation(StorageLocation storageLocation) { this.storageLocation = storageLocation; }

    public String getDirectory() { return directory; }
    public void setDirectory(String directory) { this.directory = directory; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Activity getActivity() { return activity; }
    public void setActivity(Activity activity) { this.activity = activity; }
}

