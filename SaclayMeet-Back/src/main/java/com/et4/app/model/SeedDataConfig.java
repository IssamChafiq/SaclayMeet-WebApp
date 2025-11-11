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
            u10.setBirthDate(LocalDate.of(1990, 1, 1)); // lore-agnostic placeholder
            u10.setSchoolName("Ye Ran High (exchange)");
            u10.setLevel("—");
            u10.setBio("The Noblesse. Refined taste, quiet presence, tea connoisseur.");
            u10.setFacebook("https://facebook.com/raizel.noblesse");
            u10.setInstagram("https://instagram.com/lord.raizel");
            u10.setSnapchat("lord_raizel");
            u10.setLinkedin("https://www.linkedin.com/in/raizel");
            // If this ever 404s in your network, replace with any direct public image URL of Raizel:
            u10.setProfileImageUrl("https://static.wikia.nocookie.net/noblesse/images/0/03/Cad_Raizel.png");

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
