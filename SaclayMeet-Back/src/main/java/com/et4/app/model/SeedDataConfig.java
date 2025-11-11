package com.et4.app.model;

import com.et4.app.model.*;
import com.et4.app.repository.ActivityRepository;
import com.et4.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Configuration
public class SeedDataConfig {

    @Bean
    CommandLineRunner seedData(UserRepository users, ActivityRepository activities) {
        return args -> {
            if (users.count() > 0 || activities.count() > 0) {
                return; // already seeded
            }

            // --- Create some users ---
            User u1 = new User(); u1.setEmail("alice@example.com"); u1.setPassword("pass"); u1.setFirstName("Alice"); u1.setLastName("Martin");
            User u2 = new User(); u2.setEmail("bob@example.com");   u2.setPassword("pass"); u2.setFirstName("Bob");   u2.setLastName("Durand");
            User u3 = new User(); u3.setEmail("carl@example.com");  u3.setPassword("pass"); u3.setFirstName("Carl");  u3.setLastName("Nguyen");
            User u4 = new User(); u4.setEmail("dina@example.com");  u4.setPassword("pass"); u4.setFirstName("Dina");  u4.setLastName("Lopez");
            User u5 = new User(); u5.setEmail("eva@example.com");   u5.setPassword("pass"); u5.setFirstName("Eva");   u5.setLastName("Chen");

            users.saveAll(List.of(u1, u2, u3, u4, u5));

            LocalDateTime now = LocalDateTime.now();

            // --- Helper for convenience ---
            java.util.function.BiFunction<Integer, Integer, LocalDateTime> t = (daysFromNow, hour) ->
                    now.plusDays(daysFromNow).withHour(hour).withMinute(0).withSecond(0).withNano(0);

            // --- Create activities ---
            Activity a1 = new Activity();
            a1.setTitle("Study group – Linear Algebra");
            a1.setDescription("Review session before the exam.");
            a1.setLocation("Library A");
            a1.setImageUrl("https://picsum.photos/seed/a1/800/400");
            a1.setStartTime(t.apply(1, 18));
            a1.setEndTime(t.apply(1, 20));
            a1.setCapacity(12);
            a1.setOrganizer(u1);
            a1.setTags(Set.of(Tag.Study));
            a1.setCreatedAt(now.minusHours(5));

            Activity a2 = new Activity();
            a2.setTitle("Friday Night Party");
            a2.setDescription("DJ, snacks, and good vibes.");
            a2.setLocation("Cafeteria Hall");
            a2.setImageUrl("https://picsum.photos/seed/a2/800/400");
            a2.setStartTime(t.apply(2, 22));
            a2.setEndTime(t.apply(3, 2));
            a2.setCapacity(100);
            a2.setOrganizer(u2);
            a2.setTags(Set.of(Tag.Party));
            a2.setCreatedAt(now.minusHours(4));

            Activity a3 = new Activity();
            a3.setTitle("Hiking Outing");
            a3.setDescription("Easy trail, bring water.");
            a3.setLocation("Forest North Gate");
            a3.setImageUrl("https://picsum.photos/seed/a3/800/400");
            a3.setStartTime(t.apply(5, 9));
            a3.setEndTime(t.apply(5, 14));
            a3.setCapacity(20);
            a3.setOrganizer(u3);
            a3.setTags(Set.of(Tag.Outing, Tag.Sport));
            a3.setCreatedAt(now.minusDays(1));

            Activity a4 = new Activity();
            a4.setTitle("Movie Night – Interstellar");
            a4.setDescription("Projector + popcorn.");
            a4.setLocation("Auditorium B");
            a4.setImageUrl("https://picsum.photos/seed/a4/800/400");
            a4.setStartTime(t.apply(3, 20));
            a4.setEndTime(t.apply(3, 23));
            a4.setCapacity(60);
            a4.setOrganizer(u1);
            a4.setTags(Set.of(Tag.Movie));
            a4.setCreatedAt(now.minusHours(2));

            Activity a5 = new Activity();
            a5.setTitle("Chess & Board Games");
            a5.setDescription("Bring your favorite games!");
            a5.setLocation("Student Lounge");
            a5.setImageUrl("https://picsum.photos/seed/a5/800/400");
            a5.setStartTime(t.apply(4, 17));
            a5.setEndTime(t.apply(4, 20));
            a5.setCapacity(24);
            a5.setOrganizer(u4);
            a5.setTags(Set.of(Tag.Games));
            a5.setCreatedAt(now.minusHours(1));

            Activity a6 = new Activity(); // one past event
            a6.setTitle("Football Scrimmage (PAST)");
            a6.setDescription("Pick-up game, bring cleats.");
            a6.setLocation("Field 2");
            a6.setImageUrl("https://picsum.photos/seed/a6/800/400");
            a6.setStartTime(now.minusDays(2).withHour(16).withMinute(0).withSecond(0).withNano(0));
            a6.setEndTime(now.minusDays(2).withHour(18).withMinute(0).withSecond(0).withNano(0));
            a6.setCapacity(22);
            a6.setOrganizer(u5);
            a6.setTags(Set.of(Tag.Sport));
            a6.setCreatedAt(now.minusDays(3));

            Activity a7 = new Activity();
            a7.setTitle("Museum Visit");
            a7.setDescription("Cultural afternoon at the city museum.");
            a7.setLocation("City Museum");
            a7.setImageUrl("https://picsum.photos/seed/a7/800/400");
            a7.setStartTime(t.apply(7, 15));
            a7.setEndTime(t.apply(7, 18));
            a7.setCapacity(15);
            a7.setOrganizer(u2);
            a7.setTags(Set.of(Tag.Cultural, Tag.Outing));
            a7.setCreatedAt(now.minusMinutes(30));

            Activity a8 = new Activity();
            a8.setTitle("Cozy Coding Night");
            a8.setDescription("Bring your laptop, we pair-program and chill.");
            a8.setLocation("Lab 3");
            a8.setImageUrl("https://picsum.photos/seed/a8/800/400");
            a8.setStartTime(t.apply(1, 19));
            a8.setEndTime(t.apply(1, 22));
            a8.setCapacity(16);
            a8.setOrganizer(u3);
            a8.setTags(Set.of(Tag.Study, Tag.Games));
            a8.setCreatedAt(now.minusMinutes(10));

            activities.saveAll(List.of(a1, a2, a3, a4, a5, a6, a7, a8));

            // Add participants to test subscription feature
            a1.addParticipant(u2.getId().intValue());
            a1.addParticipant(u3.getId().intValue());
            a2.addParticipant(u1.getId().intValue());
            activities.saveAll(List.of(a1, a2));

            System.out.println("✅ Seed data created: 5 users, 8 activities.");
        };
    }
}
