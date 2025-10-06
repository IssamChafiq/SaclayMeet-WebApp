package com.et4.app.repository;

import com.et4.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Cette interface permet d'interagir avec la table "user" dans la base de données
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // 🔎 Recherche un utilisateur à partir de son email
    Optional<User> findByEmail(String email);
}
