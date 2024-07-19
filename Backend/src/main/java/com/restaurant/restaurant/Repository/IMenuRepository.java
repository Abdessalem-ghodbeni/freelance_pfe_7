package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMenuRepository extends JpaRepository<Menu, Integer> {
}
