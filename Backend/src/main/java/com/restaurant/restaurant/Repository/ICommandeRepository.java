package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ICommandeRepository extends JpaRepository<Commande, Integer> {
    List<Commande> findByClient_Id(long clientId);
    @Query("SELECT c FROM Commande c WHERE DATE(c.dateCommande) = CURRENT_DATE")
    List<Commande> findAllByDateCommandeToday();
}
