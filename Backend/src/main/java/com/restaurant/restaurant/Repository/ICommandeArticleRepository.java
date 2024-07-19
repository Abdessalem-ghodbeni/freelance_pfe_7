package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Commande;
import com.restaurant.restaurant.Entites.CommandeArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ICommandeArticleRepository extends JpaRepository<CommandeArticle, Integer> {
    @Query("SELECT COUNT(DISTINCT ca.article) FROM CommandeArticle ca")
    Long getCountOfSoldArticles();
}
