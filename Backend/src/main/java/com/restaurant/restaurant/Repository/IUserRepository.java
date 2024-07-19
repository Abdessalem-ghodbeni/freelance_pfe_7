package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Role;
import com.restaurant.restaurant.Entites.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    User findByRole(Role role);
    Optional<User> findByPasswordResetToken(String passwordResetToken);


}
