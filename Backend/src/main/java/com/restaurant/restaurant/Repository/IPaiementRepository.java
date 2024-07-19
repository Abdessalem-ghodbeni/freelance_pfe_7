package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Paiement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPaiementRepository extends JpaRepository<Paiement, Integer> {
}
