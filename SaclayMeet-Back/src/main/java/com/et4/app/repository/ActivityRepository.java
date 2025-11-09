package com.et4.app.repository;

import com.et4.app.model.Activity;
import com.et4.app.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer> {

    List<Activity> findAllByOrderByCreatedAtDesc();

    List<Activity> findByOrganizer_Id(Integer organizerId);

    List<Activity> findByParticipantIdsContains(Integer userId);

    // Date helpers if you need them directly
    List<Activity> findByStartTimeAfter(LocalDateTime after);
    List<Activity> findByStartTimeBefore(LocalDateTime before);
    List<Activity> findByStartTimeBetween(LocalDateTime after, LocalDateTime before);

    // “Any of these tags” match (JPA will join the element collection)
    List<Activity> findByTagsIn(List<Tag> tags);
}
