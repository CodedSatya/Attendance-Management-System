package dev.grp5.attendance.repository;

import dev.grp5.attendance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // User findByUserName(String username);
    User findByEmail(String email);
}
