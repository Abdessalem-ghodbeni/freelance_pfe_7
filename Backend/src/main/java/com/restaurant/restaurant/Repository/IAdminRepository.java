package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAdminRepository extends JpaRepository<Admin,Long> {
}
