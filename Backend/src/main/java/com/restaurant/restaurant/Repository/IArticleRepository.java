package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IArticleRepository extends JpaRepository<Article, Integer> {
    @Query("SELECT COALESCE(a.quantityStock, 100) FROM Article a WHERE a.id = :articleId")
    Integer findQuantiteByArticleId(@Param("articleId") int articleId);

    @Query("SELECT a FROM Article a WHERE a.id NOT IN (SELECT ca.article.id FROM CommandeArticle ca)")
    List<Article> findUnsoldArticles();

}
