package com.et4.app.config;

import com.et4.app.model.*;
import com.et4.app.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Configuration
public class SeedDataConfig {

    private static final String[] FIRST_NAMES = {
            "Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah", "Ivan", "Julia"
    };
    private static final String[] LAST_NAMES = {
            "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Wilson", "Taylor"
    };
    private static final String[] LOCATIONS = {
            "Paris", "Saclay", "Versailles", "Palaiseau", "Massy", "Orsay", "Gif-sur-Yvette", "Evry"
    };
    private static final String[] TITLES = {
            "Study Session", "Movie Night", "Football Match", "Coding Jam", "Picnic", "Board Games", "Party", "Museum Visit",
            "Basketball", "Language Exchange", "Chess Club", "Volleyball Meetup", "Karaoke Night", "Running Group"
    };

    @Bean
    public CommandLineRunner seedDatabase(UserRepository userRepo, ActivityRepository activityRepo) {
        return args -> {

            if (userRepo.count() == 0 && activityRepo.count() == 0) {
                Random random = new Random();

                // 1. Create 10 random users
                List<User> users = new ArrayList<>();
                for (int i = 0; i < 10; i++) {
                    User u = new User();
                    u.setFirstName(FIRST_NAMES[i]);
                    u.setLastName(LAST_NAMES[i]);
                    u.setEmail("user" + i + "@saclaymeet.com");
                    u.setPassword("password" + i);
                    u.setBirthDate(LocalDate.of(1995 + random.nextInt(10), 1 + random.nextInt(12), 1 + random.nextInt(28)));
                    u.setSchool("Université Paris-Saclay");
                    u.setLevel("M" + (1 + random.nextInt(2))); // M1 or M2
                    u.setBio("Hello! I'm " + u.getFirstName() + " and I love joining fun activities.");
                    users.add(u);
                }
                userRepo.saveAll(users);

                // 2. Create 30 random activities linked to users
                List<Activity> activities = new ArrayList<>();
                Tag[] allTags = Tag.values();

                for (int i = 0; i < 30; i++) {
                    Activity a = new Activity();
                    a.setTitle(TITLES[random.nextInt(TITLES.length)] + " #" + (i + 1));
                    a.setDescription("Join us for " + a.getTitle() + "! It’ll be a great time to meet new people and have fun.");
                    a.setLocation(LOCATIONS[random.nextInt(LOCATIONS.length)]);
                    a.setImageUrl("https://picsum.photos/seed/activity" + i + "/400/300");
                    a.setCapacity(5 + random.nextInt(20));
                    a.setOrganizer(users.get(random.nextInt(users.size())));
                    a.setCreatedAt(LocalDateTime.now().minusDays(random.nextInt(10)));
                    a.setStartTime(LocalDateTime.now().plusDays(random.nextInt(7)).plusHours(random.nextInt(12)));
                    a.setEndTime(a.getStartTime().plusHours(2 + random.nextInt(3)));
                    a.setStatus(ActivityStatus.POSTED);

                    // Random tags
                    Set<Tag> tags = new HashSet<>();
                    int tagCount = 1 + random.nextInt(3);
                    for (int t = 0; t < tagCount; t++) {
                        tags.add(allTags[random.nextInt(allTags.length)]);
                    }
                    a.setTags(tags);

                    activities.add(a);
                }
                activityRepo.saveAll(activities);

                System.out.println("✅ Seeded 10 users and 30 activities successfully!");
            } else {
                System.out.println("⚠️ Database already seeded, skipping initial data generation.");
            }
        };
    }
}
