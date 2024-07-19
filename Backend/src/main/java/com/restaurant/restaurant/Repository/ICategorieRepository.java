package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategorieRepository extends JpaRepository<Categorie, Integer> {
    Categorie findByNom(String nom);

}
