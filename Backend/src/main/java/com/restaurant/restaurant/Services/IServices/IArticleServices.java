package com.restaurant.restaurant.Services.IServices;
import com.restaurant.restaurant.Entites.Article;
import java.util.List;

public interface IArticleServices {
    public Article ajouterArticle (Article articlee);
    public Article modifierArticle( Article articleModifie);
    public void supprimerArticle(int id);
    public List<Article> getAllArticle();
   Article  getArticleByiD(int artilceId);
    public long getCountOfSoldArticles();
    List<Article> getUnsoldArticles();
    long getCountOfUnsoldArticles();
    List<Article> getTop10Articles();
    Integer getArticleQuantite(int articleId);
}
