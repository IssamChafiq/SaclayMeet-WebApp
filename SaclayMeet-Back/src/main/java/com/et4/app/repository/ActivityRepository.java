package com.et4.app.repository;

import com.et4.app.model.Activity;
import com.et4.app.model.ActivityStatus;
import com.et4.app.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer> {

    List<Activity> findAllByOrderByCreatedAtDesc();

    List<Activity> findAllByStatusNotOrderByCreatedAtDesc(ActivityStatus status);

    List<Activity> findByOrganizer_Id(Integer organizerId);

    List<Activity> findByParticipantIdsContains(Integer userId);

    List<Activity> findByStartTimeAfter(LocalDateTime after);
    List<Activity> findByStartTimeBefore(LocalDateTime before);
    List<Activity> findByStartTimeBetween(LocalDateTime after, LocalDateTime before);

    @Override
    Optional<Activity> findById(Integer id);

    List<Activity> findByTagsIn(List<Tag> tags);
}
