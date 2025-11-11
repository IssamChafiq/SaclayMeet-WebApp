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
            u10.setBirthDate(LocalDate.of(1000, 1, 1)); // lore-agnostic placeholder
            u10.setSchoolName("Ye Ran High (exchange)");
            u10.setLevel("—");
            u10.setBio("The Noblesse. Refined taste, quiet presence, tea connoisseur.");
            u10.setFacebook("https://facebook.com/raizel.noblesse");
            u10.setInstagram("https://instagram.com/lord.raizel");
            u10.setSnapchat("lord_raizel");
            u10.setLinkedin("https://www.linkedin.com/in/raizel");
            // If this ever 404s in your network, replace with any direct public image URL of Raizel:
            u10.setProfileImageUrl("data:image/jpeg;base64,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");

            users.saveAll(List.of(u1,u2,u3,u4,u5,u6,u7,u8,u9,u10));

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

            activities.saveAll(List.of(
                    a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,
                    a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,
                    a21,a22,a23,a24,a25,a26,a27,a28,a29,a30
            ));

            // Some participants for realism
            a1.addParticipant(u2.getId());
            a1.addParticipant(u3.getId());
            a2.addParticipant(u1.getId());
            a3.addParticipant(u4.getId());
            a3.addParticipant(u5.getId());
            a10.addParticipant(u1.getId());
            a10.addParticipant(u9.getId());
            a16.addParticipant(u7.getId());
            a16.addParticipant(u6.getId());
            a30.addParticipant(u1.getId());  // Alice joins Raizel’s tea party
            a30.addParticipant(u8.getId());  // Ines joins
            a30.addParticipant(u9.getId());  // Yara joins

            activities.saveAll(List.of(
                    a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,
                    a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,
                    a21,a22,a23,a24,a25,a26,a27,a28,a29,a30
            ));

            System.out.println("✅ Seed data created: 10 users (full profiles, with images), 30 activities (diverse).");
        };
    }
}
