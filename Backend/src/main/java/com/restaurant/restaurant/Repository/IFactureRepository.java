package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFactureRepository extends JpaRepository<Facture, Integer> {
}
