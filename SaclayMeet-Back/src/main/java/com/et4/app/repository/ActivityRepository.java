package com.et4.app.repository;

import com.et4.app.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer> {

    // All activities created by an organizer
    List<Activity> findByOrganizer_Id(Integer organizerId);

    // All activities a user has joined (participantIds contains userId)
    List<Activity> findByParticipantIdsContains(Integer userId);

    // Optional: newest first
    List<Activity> findAllByOrderByCreatedAtDesc();
}
