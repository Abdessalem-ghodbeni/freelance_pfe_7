package com.restaurant.restaurant.Services.ServiceImpl;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Categorie;
import com.restaurant.restaurant.Entites.Menu;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Repository.IArticleRepository;
import com.restaurant.restaurant.Repository.ICategorieRepository;
import com.restaurant.restaurant.Repository.ICommandeArticleRepository;
import com.restaurant.restaurant.Repository.IMenuRepository;
import com.restaurant.restaurant.Services.IServices.IArticleServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ArticleServiceImplements implements IArticleServices {
    private final IArticleRepository articleRepository;
    private final ICategorieRepository categorieRepository;
    private final IMenuRepository menuRepository;
    private final ICommandeArticleRepository commandeArticleRepository;
    @Override
    public Article ajouterArticle(Article articlee) {
        Article article = new Article();
        article.setNom(articlee.getNom());
        article.setDescription(articlee.getDescription());
        article.setPrix(articlee.getPrix());
        article.setImage(articlee.getImage());
        article.setQuantityStock(articlee.getQuantityStock() != null ? articlee.getQuantityStock() : 1000000.0);

        if(articlee.getCategorie() != null) {
            Categorie categorie = categorieRepository.findById(articlee.getCategorie().getId())
                    .orElseThrow(() -> new RuntimeException("Catégorie non trouvée"));
            article.setCategorie(categorie);
        }

        return articleRepository.save(article);
    }
    public Integer getArticleQuantite(int articleId) {
        return articleRepository.findQuantiteByArticleId(articleId);
    }
    @Override
    @Transactional
    public Article modifierArticle(Article articleModifie) {

        Article article = articleRepository.findById(articleModifie.getId())
                .orElseThrow(() -> new RuntimeException("Article non trouvé pour l'ID : " + articleModifie.getId()));

        if (articleModifie.getNom() != null) {
            article.setNom(articleModifie.getNom());
        }
        if (articleModifie.getDescription() != null) {
            article.setDescription(articleModifie.getDescription());
        }
        if (articleModifie.getPrix() != null) {
            article.setPrix(articleModifie.getPrix());
        }
        if (articleModifie.getImage() != null) {
            article.setImage(articleModifie.getImage());
        }
        if (articleModifie.getCategorie() != null ) {

            Categorie categorie = categorieRepository.findById(articleModifie.getCategorie().getId())
                    .orElseThrow(() -> new RuntimeException("Nouvelle catégorie non trouvée"));
            article.setCategorie(categorie);

        }


        return articleRepository.save(article);
    }

    @Override
    public void supprimerArticle(int id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article non trouvé pour l'ID : " + id));


        articleRepository.delete(article);
    }

    @Override
    public List<Article> getAllArticle() {
        return articleRepository.findAll();
    }



    @Override
    public Article getArticleByiD(int artilceId) {
        Article article=articleRepository.findById(artilceId).orElseThrow(()-> new RessourceNotFound("article n'exite pas avec id"+artilceId));
        return article;



    }

    @Override
    public long getCountOfSoldArticles() {
        Long countOfSoldArticles = commandeArticleRepository.getCountOfSoldArticles();
        return countOfSoldArticles != null ? countOfSoldArticles : 0;
    }

    @Override
    public List<Article> getUnsoldArticles() {
        return articleRepository.findUnsoldArticles();
    }

    @Override
    public long getCountOfUnsoldArticles() {
        return articleRepository.findUnsoldArticles().size();
    }

    @Override
    public List<Article> getTop10Articles() {
        return articleRepository.findAll(PageRequest.of(0, 12)).getContent();
    }


}
