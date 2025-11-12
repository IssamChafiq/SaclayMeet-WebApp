package com.et4.app.model;

import com.et4.app.repository.ActivityRepository;
import com.et4.app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
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

            // =========================
            // Users (10) with full attrs
            // =========================

            User u1 = new User();
            u1.setEmail("alice@example.com");
            u1.setPassword("pass");
            u1.setFirstName("Alice");
            u1.setLastName("Martin");
            u1.setBirthDate(LocalDate.of(2001, 3, 14));
            u1.setSchoolName("Polytech Paris-Saclay");
            u1.setLevel("M1 Computer Science");
            u1.setBio("Coffee-powered coder. Loves study groups and cozy movie nights.");
            u1.setFacebook("https://facebook.com/alice.martin");
            u1.setInstagram("https://instagram.com/alice.codes");
            u1.setSnapchat("alice_snap");
            u1.setLinkedin("https://www.linkedin.com/in/alicemartin");
            u1.setProfileImageUrl("https://picsum.photos/seed/user1/200/200");

            User u2 = new User();
            u2.setEmail("bob@example.com");
            u2.setPassword("pass");
            u2.setFirstName("Bob");
            u2.setLastName("Durand");
            u2.setBirthDate(LocalDate.of(2000, 11, 2));
            u2.setSchoolName("Université Paris-Saclay");
            u2.setLevel("L3 Mathematics");
            u2.setBio("Part-time DJ, full-time algebra enjoyer.");
            u2.setFacebook("https://facebook.com/bob.durand");
            u2.setInstagram("https://instagram.com/bob.vibes");
            u2.setSnapchat("bob_drd");
            u2.setLinkedin("https://www.linkedin.com/in/bobdurand");
            u2.setProfileImageUrl("https://picsum.photos/seed/user2/200/200");

            User u3 = new User();
            u3.setEmail("carl@example.com");
            u3.setPassword("pass");
            u3.setFirstName("Carl");
            u3.setLastName("Nguyen");
            u3.setBirthDate(LocalDate.of(1999, 6, 22));
            u3.setSchoolName("ENS Paris-Saclay");
            u3.setLevel("M2 Data Science");
            u3.setBio("Outdoorsy data nerd. If not hiking, I’m coding.");
            u3.setFacebook("https://facebook.com/carl.nguyen");
            u3.setInstagram("https://instagram.com/carl.outdoors");
            u3.setSnapchat("carl_hike");
            u3.setLinkedin("https://www.linkedin.com/in/carlsnguyen");
            u3.setProfileImageUrl("https://picsum.photos/seed/user3/200/200");

            User u4 = new User();
            u4.setEmail("dina@example.com");
            u4.setPassword("pass");
            u4.setFirstName("Dina");
            u4.setLastName("Lopez");
            u4.setBirthDate(LocalDate.of(2002, 1, 9));
            u4.setSchoolName("AgroParisTech");
            u4.setLevel("M1 Environmental Eng.");
            u4.setBio("Board games, museum hopping, and matcha latte stan.");
            u4.setFacebook("https://facebook.com/dina.lopez");
            u4.setInstagram("https://instagram.com/dina.plants");
            u4.setSnapchat("dinalo");
            u4.setLinkedin("https://www.linkedin.com/in/dinalopez");
            u4.setProfileImageUrl("https://picsum.photos/seed/user4/200/200");

            User u5 = new User();
            u5.setEmail("eva@example.com");
            u5.setPassword("pass");
            u5.setFirstName("Eva");
            u5.setLastName("Chen");
            u5.setBirthDate(LocalDate.of(1998, 12, 5));
            u5.setSchoolName("CentraleSupélec");
            u5.setLevel("M2 Electrical Eng.");
            u5.setBio("Sports junkie. If it’s got a ball, I’m in.");
            u5.setFacebook("https://facebook.com/eva.chen");
            u5.setInstagram("https://instagram.com/evachn");
            u5.setSnapchat("eva_fit");
            u5.setLinkedin("https://www.linkedin.com/in/evachen");
            u5.setProfileImageUrl("https://picsum.photos/seed/user5/200/200");

            User u6 = new User();
            u6.setEmail("fran@example.com");
            u6.setPassword("pass");
            u6.setFirstName("Fran");
            u6.setLastName("Petit");
            u6.setBirthDate(LocalDate.of(2001, 9, 17));
            u6.setSchoolName("HEC Paris");
            u6.setLevel("M1 Management");
            u6.setBio("Pitch decks, pastries, and Pilates.");
            u6.setFacebook("https://facebook.com/fran.petit");
            u6.setInstagram("https://instagram.com/fran.ptt");
            u6.setSnapchat("franpetit");
            u6.setLinkedin("https://www.linkedin.com/in/franpetit");
            u6.setProfileImageUrl("https://picsum.photos/seed/user6/200/200");

            User u7 = new User();
            u7.setEmail("hugo@example.com");
            u7.setPassword("pass");
            u7.setFirstName("Hugo");
            u7.setLastName("Lemaire");
            u7.setBirthDate(LocalDate.of(2003, 7, 30));
            u7.setSchoolName("IUT Orsay");
            u7.setLevel("DUT Informatique");
            u7.setBio("LAN parties, retro games, pizza enthusiast.");
            u7.setFacebook("https://facebook.com/hugo.lemaire");
            u7.setInstagram("https://instagram.com/hugo.retrogames");
            u7.setSnapchat("hugolm");
            u7.setLinkedin("https://www.linkedin.com/in/hugolemaire");
            u7.setProfileImageUrl("https://picsum.photos/seed/user7/200/200");

            User u8 = new User();
            u8.setEmail("ines@example.com");
            u8.setPassword("pass");
            u8.setFirstName("Ines");
            u8.setLastName("Guerin");
            u8.setBirthDate(LocalDate.of(2002, 4, 3));
            u8.setSchoolName("Université d'Évry");
            u8.setLevel("L3 Biology");
            u8.setBio("City walks, indie films, and experimental baking.");
            u8.setFacebook("https://facebook.com/ines.guerin");
            u8.setInstagram("https://instagram.com/ines.films");
            u8.setSnapchat("inesgrn");
            u8.setLinkedin("https://www.linkedin.com/in/inesguerin");
            u8.setProfileImageUrl("https://picsum.photos/seed/user8/200/200");

            User u9 = new User();
            u9.setEmail("yara@example.com");
            u9.setPassword("pass");
            u9.setFirstName("Yara");
            u9.setLastName("Benali");
            u9.setBirthDate(LocalDate.of(2001, 8, 25));
            u9.setSchoolName("ENSIIE");
            u9.setLevel("M1 Software Eng.");
            u9.setBio("K-dramas, yoga, and perfectly organized Notion boards.");
            u9.setFacebook("https://facebook.com/yara.benali");
            u9.setInstagram("https://instagram.com/yarabnl");
            u9.setSnapchat("yara_bnl");
            u9.setLinkedin("https://www.linkedin.com/in/yarabenali");
            u9.setProfileImageUrl("https://picsum.photos/seed/user9/200/200");

            User u10 = new User();
            u10.setEmail("raizel@example.com");
            u10.setPassword("pass");
            u10.setFirstName("Raizel");
            u10.setLastName("Noblesse");
            u10.setBirthDate(LocalDate.of(1000  , 1, 1)); // lore-agnostic placeholder
            u10.setSchoolName("Ye Ran High (exchange)");
            u10.setLevel("—");
            u10.setBio("The Noblesse. Refined taste, quiet presence, tea connoisseur.");
            u10.setFacebook("https://facebook.com/raizel.noblesse");
            u10.setInstagram("https://instagram.com/lord.raizel");
            u10.setSnapchat("lord_raizel");
            u10.setLinkedin("https://www.linkedin.com/in/raizel");
            // If this ever 404s in your network, replace with any direct public image URL of Raizel:
            u10.setProfileImageUrl("data:image/jpeg;base64,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");

            User u11 = new User();
            u11.setEmail("faker@example.com");
            u11.setPassword("pass");
            u11.setFirstName("Faker");
            u11.setLastName("Lee Sang-hyeok");
            u11.setBirthDate(LocalDate.of(1996, 5, 7));
            u11.setSchoolName("T1 Esports");
            u11.setLevel("Challenger");
            u11.setBio("6x Worlds winner. Unkillable Demon King.");
            u11.setFacebook("https://facebook.com/Faker");
            u11.setInstagram("https://instagram.com/t1faker");
            u11.setSnapchat("faker6");
            u11.setLinkedin("https://www.linkedin.com/in/t1-faker");
            // Use a normal URL; avoid base64 (column length).
            u11.setProfileImageUrl("data:image/jpeg;base64,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");

            // --- u12: Gumayusi (Lee Min-hyeong) ---
            User u12 = new User();
            u12.setEmail("gumayusi@example.com");
            u12.setPassword("pass");
            u12.setFirstName("Gumayusi");
            u12.setLastName("Lee Min-hyeong");
            u12.setBirthDate(LocalDate.of(2002, 2, 6));
            u12.setSchoolName("T1 Esports");
            u12.setLevel("Challenger");
            u12.setBio("Korean ADC enjoyer. Aim true.");
            u12.setFacebook("https://facebook.com/gumayusi");
            u12.setInstagram("https://instagram.com/t1_gumayusi");
            u12.setSnapchat("guma2002");
            u12.setLinkedin("https://www.linkedin.com/in/gumayusi");
            u12.setProfileImageUrl("data:image/jpeg;base64,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");

            users.saveAll(List.of(
                    u1,u2,u3,u4,u5,u6,u7,u8,u9,u10,u11,u12
            ));

            LocalDateTime now = LocalDateTime.now();
            java.util.function.BiFunction<Integer, Integer, LocalDateTime> t = (daysFromNow, hour) ->
                    now.plusDays(daysFromNow).withHour(hour).withMinute(0).withSecond(0).withNano(0);


            // =======================
            // Activities (30) diverse
            // =======================

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

            Activity a6 = new Activity();
            a6.setTitle("Football Scrimmage (PAST)");
            a6.setDescription("Pick-up game, bring cleats.");
            a6.setLocation("Field 2");
            a6.setImageUrl("https://picsum.photos/seed/a6/800/400");
            a6.setStartTime(now.minusDays(2).withHour(16).withMinute(0));
            a6.setEndTime(now.minusDays(2).withHour(18).withMinute(0));
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

            Activity a9 = new Activity();
            a9.setTitle("Early Morning Yoga");
            a9.setDescription("Gentle vinyasa to start the day.");
            a9.setLocation("Gym Studio A");
            a9.setImageUrl("https://picsum.photos/seed/a9/800/400");
            a9.setStartTime(t.apply(2, 7));
            a9.setEndTime(t.apply(2, 8));
            a9.setCapacity(25);
            a9.setOrganizer(u9);
            a9.setTags(Set.of(Tag.Sport));
            a9.setCreatedAt(now.minusHours(6));

            Activity a10 = new Activity();
            a10.setTitle("Street Photography Walk");
            a10.setDescription("Capture the campus golden hour.");
            a10.setLocation("Main Gate");
            a10.setImageUrl("https://picsum.photos/seed/a10/800/400");
            a10.setStartTime(t.apply(2, 18));
            a10.setEndTime(t.apply(2, 20));
            a10.setCapacity(18);
            a10.setOrganizer(u8);
            a10.setTags(Set.of(Tag.Outing, Tag.Cultural));
            a10.setCreatedAt(now.minusHours(3));

            Activity a11 = new Activity();
            a11.setTitle("Karaoke Night");
            a11.setDescription("Don’t be shy. We’re all bad together.");
            a11.setLocation("Cafeteria Annex");
            a11.setImageUrl("https://picsum.photos/seed/a11/800/400");
            a11.setStartTime(t.apply(6, 21));
            a11.setEndTime(t.apply(7, 0));
            a11.setCapacity(50);
            a11.setOrganizer(u2);
            a11.setTags(Set.of(Tag.Party, Tag.Cultural));
            a11.setCreatedAt(now.minusHours(7));

            Activity a12 = new Activity();
            a12.setTitle("Classic Film Club – Casablanca");
            a12.setDescription("We’ll discuss themes after the screening.");
            a12.setLocation("Auditorium A");
            a12.setImageUrl("https://picsum.photos/seed/a12/800/400");
            a12.setStartTime(t.apply(5, 19));
            a12.setEndTime(t.apply(5, 21));
            a12.setCapacity(40);
            a12.setOrganizer(u1);
            a12.setTags(Set.of(Tag.Movie, Tag.Cultural));
            a12.setCreatedAt(now.minusDays(1).minusHours(2));

            Activity a13 = new Activity();
            a13.setTitle("Applied Probability Study Jam");
            a13.setDescription("Markov chains and martingales, yay.");
            a13.setLocation("Library B");
            a13.setImageUrl("https://picsum.photos/seed/a13/800/400");
            a13.setStartTime(t.apply(3, 16));
            a13.setEndTime(t.apply(3, 19));
            a13.setCapacity(14);
            a13.setOrganizer(u9);
            a13.setTags(Set.of(Tag.Study));
            a13.setCreatedAt(now.minusMinutes(55));

            Activity a14 = new Activity();
            a14.setTitle("Frisbee on the Lawn");
            a14.setDescription("Casual throws, beginners welcome.");
            a14.setLocation("Central Lawn");
            a14.setImageUrl("https://picsum.photos/seed/a14/800/400");
            a14.setStartTime(t.apply(1, 12));
            a14.setEndTime(t.apply(1, 13));
            a14.setCapacity(30);
            a14.setOrganizer(u5);
            a14.setTags(Set.of(Tag.Sport));
            a14.setCreatedAt(now.minusMinutes(25));

            Activity a15 = new Activity();
            a15.setTitle("Museum Sketching");
            a15.setDescription("Bring pencils, we’ll sketch sculptures.");
            a15.setLocation("City Museum");
            a15.setImageUrl("https://picsum.photos/seed/a15/800/400");
            a15.setStartTime(t.apply(9, 14));
            a15.setEndTime(t.apply(9, 16));
            a15.setCapacity(14);
            a15.setOrganizer(u8);
            a15.setTags(Set.of(Tag.Cultural, Tag.Outing));
            a15.setCreatedAt(now.minusHours(12));

            Activity a16 = new Activity();
            a16.setTitle("LAN Party – Retro Emulators");
            a16.setDescription("SNES/PS1 era. Bring controllers if you can.");
            a16.setLocation("Dorm Common Room 2");
            a16.setImageUrl("https://picsum.photos/seed/a16/800/400");
            a16.setStartTime(t.apply(4, 18));
            a16.setEndTime(t.apply(4, 23));
            a16.setCapacity(20);
            a16.setOrganizer(u7);
            a16.setTags(Set.of(Tag.Games, Tag.Party));
            a16.setCreatedAt(now.minusHours(22));

            Activity a17 = new Activity();
            a17.setTitle("Sushi & Study – Algorithms");
            a17.setDescription("Divide & Conquer and some maki.");
            a17.setLocation("Library C");
            a17.setImageUrl("https://picsum.photos/seed/a17/800/400");
            a17.setStartTime(t.apply(2, 17));
            a17.setEndTime(t.apply(2, 20));
            a17.setCapacity(10);
            a17.setOrganizer(u1);
            a17.setTags(Set.of(Tag.Study, Tag.Outing));
            a17.setCreatedAt(now.minusHours(18));

            Activity a18 = new Activity();
            a18.setTitle("Sunday Brunch Picnic");
            a18.setDescription("Pancakes, fruits, and gossip.");
            a18.setLocation("Lake Park");
            a18.setImageUrl("https://picsum.photos/seed/a18/800/400");
            a18.setStartTime(t.apply(6, 11));
            a18.setEndTime(t.apply(6, 13));
            a18.setCapacity(25);
            a18.setOrganizer(u6);
            a18.setTags(Set.of(Tag.Outing, Tag.Party));
            a18.setCreatedAt(now.minusDays(2).minusHours(1));

            Activity a19 = new Activity();
            a19.setTitle("Climbing Session");
            a19.setDescription("Indoor bouldering, rentals available.");
            a19.setLocation("ClimbUp Gym");
            a19.setImageUrl("https://picsum.photos/seed/a19/800/400");
            a19.setStartTime(t.apply(8, 18));
            a19.setEndTime(t.apply(8, 20));
            a19.setCapacity(12);
            a19.setOrganizer(u5);
            a19.setTags(Set.of(Tag.Sport));
            a19.setCreatedAt(now.minusDays(1).minusHours(3));

            Activity a20 = new Activity();
            a20.setTitle("Anime Night – Your Name");
            a20.setDescription("Tissues provided.");
            a20.setLocation("Auditorium C");
            a20.setImageUrl("https://picsum.photos/seed/a20/800/400");
            a20.setStartTime(t.apply(5, 20));
            a20.setEndTime(t.apply(5, 22));
            a20.setCapacity(70);
            a20.setOrganizer(u8);
            a20.setTags(Set.of(Tag.Movie, Tag.Cultural));
            a20.setCreatedAt(now.minusDays(1).minusMinutes(40));

            Activity a21 = new Activity();
            a21.setTitle("Debate Club: AI & Ethics");
            a21.setDescription("Hot takes welcome. Be respectful.");
            a21.setLocation("Lecture Hall D");
            a21.setImageUrl("https://picsum.photos/seed/a21/800/400");
            a21.setStartTime(t.apply(3, 18));
            a21.setEndTime(t.apply(3, 20));
            a21.setCapacity(45);
            a21.setOrganizer(u6);
            a21.setTags(Set.of(Tag.Cultural, Tag.Study));
            a21.setCreatedAt(now.minusHours(16));

            Activity a22 = new Activity();
            a22.setTitle("Photography Editing Workshop");
            a22.setDescription("Lightroom basics & color theory.");
            a22.setLocation("Media Lab");
            a22.setImageUrl("https://picsum.photos/seed/a22/800/400");
            a22.setStartTime(t.apply(3, 15));
            a22.setEndTime(t.apply(3, 17));
            a22.setCapacity(16);
            a22.setOrganizer(u8);
            a22.setTags(Set.of(Tag.Cultural));
            a22.setCreatedAt(now.minusHours(14));

            Activity a23 = new Activity();
            a23.setTitle("Campus Run 5K");
            a23.setDescription("Easy pace, all levels.");
            a23.setLocation("Track Start");
            a23.setImageUrl("https://picsum.photos/seed/a23/800/400");
            a23.setStartTime(t.apply(2, 8));
            a23.setEndTime(t.apply(2, 9));
            a23.setCapacity(60);
            a23.setOrganizer(u5);
            a23.setTags(Set.of(Tag.Sport));
            a23.setCreatedAt(now.minusHours(28));

            Activity a24 = new Activity();
            a24.setTitle("Board Games Marathon");
            a24.setDescription("Catan, Azul, Secret Hitler, you name it.");
            a24.setLocation("Student Lounge");
            a24.setImageUrl("https://picsum.photos/seed/a24/800/400");
            a24.setStartTime(t.apply(2, 14));
            a24.setEndTime(t.apply(2, 22));
            a24.setCapacity(30);
            a24.setOrganizer(u4);
            a24.setTags(Set.of(Tag.Games));
            a24.setCreatedAt(now.minusHours(9));

            Activity a25 = new Activity();
            a25.setTitle("Open-Air Cinema – Parasite");
            a25.setDescription("Bring blankets. Subbed.");
            a25.setLocation("South Lawn");
            a25.setImageUrl("https://picsum.photos/seed/a25/800/400");
            a25.setStartTime(t.apply(10, 21));
            a25.setEndTime(t.apply(10, 23));
            a25.setCapacity(120);
            a25.setOrganizer(u1);
            a25.setTags(Set.of(Tag.Movie, Tag.Cultural));
            a25.setCreatedAt(now.minusDays(2).minusHours(3));

            Activity a26 = new Activity();
            a26.setTitle("Museum Night – Modern Art");
            a26.setDescription("Late entry group ticket.");
            a26.setLocation("City Modern Art Museum");
            a26.setImageUrl("https://picsum.photos/seed/a26/800/400");
            a26.setStartTime(t.apply(12, 19));
            a26.setEndTime(t.apply(12, 22));
            a26.setCapacity(18);
            a26.setOrganizer(u8);
            a26.setTags(Set.of(Tag.Cultural, Tag.Outing));
            a26.setCreatedAt(now.minusDays(2).minusMinutes(15));

            Activity a27 = new Activity();
            a27.setTitle("Basketball 3v3");
            a27.setDescription("Form teams on-site.");
            a27.setLocation("Gym Court");
            a27.setImageUrl("https://picsum.photos/seed/a27/800/400");
            a27.setStartTime(t.apply(1, 17));
            a27.setEndTime(t.apply(1, 19));
            a27.setCapacity(24);
            a27.setOrganizer(u5);
            a27.setTags(Set.of(Tag.Sport));
            a27.setCreatedAt(now.minusHours(5));

            Activity a28 = new Activity();
            a28.setTitle("Indie Film Shorts");
            a28.setDescription("Screening + Q&A with student directors.");
            a28.setLocation("Auditorium D");
            a28.setImageUrl("https://picsum.photos/seed/a28/800/400");
            a28.setStartTime(t.apply(8, 19));
            a28.setEndTime(t.apply(8, 21));
            a28.setCapacity(80);
            a28.setOrganizer(u8);
            a28.setTags(Set.of(Tag.Movie, Tag.Cultural));
            a28.setCreatedAt(now.minusHours(11));

            Activity a29 = new Activity();
            a29.setTitle("Language Exchange Café");
            a29.setDescription("Practice FR/EN/ES. Beginners welcome.");
            a29.setLocation("Café du Campus");
            a29.setImageUrl("https://picsum.photos/seed/a29/800/400");
            a29.setStartTime(t.apply(3, 18));
            a29.setEndTime(t.apply(3, 20));
            a29.setCapacity(35);
            a29.setOrganizer(u6);
            a29.setTags(Set.of(Tag.Cultural, Tag.Outing));
            a29.setCreatedAt(now.minusHours(8));

            // The one you asked for: Raizel’s tea party
            Activity a30 = new Activity();
            a30.setTitle("Elegant Tea Party");
            a30.setDescription("Hosted by Lord Raizel. Dress code: semi-formal.");
            a30.setLocation("Garden Pavilion");
            a30.setImageUrl("https://picsum.photos/seed/a30/800/400");
            a30.setStartTime(t.apply(6, 16));
            a30.setEndTime(t.apply(6, 18));
            a30.setCapacity(20);
            a30.setOrganizer(u10); // Raizel
            a30.setTags(Set.of(Tag.Cultural, Tag.Outing));
            a30.setCreatedAt(now.minusMinutes(5));

            Activity a31 = new Activity();
            a31.setTitle("SoloQ VOD Review with Faker");
            a31.setDescription("Mid lane concepts: wave states, trading windows, roam timers.");
            a31.setLocation("Esports Room");
            a31.setImageUrl("https://picsum.photos/seed/a31/800/400");
            a31.setStartTime(t.apply(3, 18));
            a31.setEndTime(t.apply(3, 20));
            a31.setCapacity(40);
            a31.setOrganizer(u11);
            a31.setTags(Set.of(Tag.Games, Tag.Study));
            a31.setCreatedAt(now.minusMinutes(20));

            Activity a32 = new Activity();
            a32.setTitle("Worlds Finals Viewing Party");
            a32.setDescription("Live watch, analysis at breaks. Jerseys welcome.");
            a32.setLocation("Auditorium E");
            a32.setImageUrl("https://picsum.photos/seed/a32/800/400");
            a32.setStartTime(t.apply(1, 21));
            a32.setEndTime(t.apply(2, 1));
            a32.setCapacity(180);
            a32.setOrganizer(u11);
            a32.setTags(Set.of(Tag.Party, Tag.Games));
            a32.setCreatedAt(now.minusHours(2));

            Activity a33 = new Activity();
            a33.setTitle("PC Bang Night with Gumayusi");
            a33.setDescription("In-house custom games, bot lane drills, ARAMs to chill.");
            a33.setLocation("Lab 5 (converted)");
            a33.setImageUrl("https://picsum.photos/seed/a33/800/400");
            a33.setStartTime(t.apply(5, 19));
            a33.setEndTime(t.apply(5, 23));
            a33.setCapacity(30);
            a33.setOrganizer(u12);
            a33.setTags(Set.of(Tag.Games, Tag.Party));
            a33.setCreatedAt(now.minusMinutes(45));

            Activity a34 = new Activity();
            a34.setTitle("K-BBQ & Draft Theory");
            a34.setDescription("Kimchi + comps: prio picks, flex value, red/blue strategies.");
            a34.setLocation("K-Square Courtyard");
            a34.setImageUrl("https://picsum.photos/seed/a34/800/400");
            a34.setStartTime(t.apply(4, 18));
            a34.setEndTime(t.apply(4, 21));
            a34.setCapacity(50);
            a34.setOrganizer(u11);
            a34.setTags(Set.of(Tag.Cultural, Tag.Games, Tag.Outing));
            a34.setCreatedAt(now.minusHours(6));

            Activity a35 = new Activity();
            a35.setTitle("Hangul Calligraphy Workshop");
            a35.setDescription("Write your in-game name in Hangul. Materials provided.");
            a35.setLocation("Cultural Center Room 2");
            a35.setImageUrl("https://picsum.photos/seed/a35/800/400");
            a35.setStartTime(t.apply(6, 16));
            a35.setEndTime(t.apply(6, 18));
            a35.setCapacity(22);
            a35.setOrganizer(u12);
            a35.setTags(Set.of(Tag.Cultural));
            a35.setCreatedAt(now.minusHours(1));

            Activity a36 = new Activity();
            a36.setTitle("Bot Lane Clinic: Guma x You");
            a36.setDescription("Lantern control, wave bounce, crash timings, punish windows.");
            a36.setLocation("Esports Room");
            a36.setImageUrl("data:image/jpeg;base64,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");
            a36.setStartTime(t.apply(7, 17));
            a36.setEndTime(t.apply(7, 19));
            a36.setCapacity(24);
            a36.setOrganizer(u12);
            a36.setTags(Set.of(Tag.Games, Tag.Study));
            a36.setCreatedAt(now.minusMinutes(5));

            activities.saveAll(List.of(
                    a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,
                    a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,
                    a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,
                    a31,a32,a33,a34,a35,a36
            ));

            // sprinkle a few participants on new events
            a31.addParticipant(u1.getId());
            a31.addParticipant(u3.getId());
            a32.addParticipant(u7.getId());
            a32.addParticipant(u9.getId());
            a33.addParticipant(u6.getId());
            a34.addParticipant(u8.getId());
            a35.addParticipant(u5.getId());
            a36.addParticipant(u2.getId());
            activities.saveAll(List.of(a31,a32,a33,a34,a35,a36));

            System.out.println("✅ Seed data created: 10 users (full profiles, with images), 30 activities (diverse).");
        };
    }
}
