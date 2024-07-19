package com.restaurant.restaurant.Services.ServiceImpl;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Categorie;
import com.restaurant.restaurant.Entites.Menu;
import com.restaurant.restaurant.Repository.IArticleRepository;
import com.restaurant.restaurant.Repository.ICategorieRepository;
import com.restaurant.restaurant.Repository.IMenuRepository;
import com.restaurant.restaurant.Services.IServices.ICategorieServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategorieServiceImplements implements ICategorieServices {
    private final ICategorieRepository categorieRepository;
    private final IArticleRepository articleRepository;
    private final IMenuRepository menuRepository;
    @Override
    @Transactional
    public Categorie ajouterCategorie(Categorie categorie) {
//        Categorie categoriy = new Categorie();
//        categoriy.setNom(categorie.getNom());
//        categoriy.setDescription(categorie.getDescription());
//        categoriy.setArticles(categorie.getArticles());
//        categoriy.setMenu(categorie.getMenu());
//
//        if (categorie.getArticles() != null) {
//            for (Article article : categorie.getArticles()) {
//                article.setCategorie(categorie);
//                articleRepository.save(article);
//            }
//        }
//        if (categorie.getMenu() != null) {
//            Menu menu = menuRepository.findById(categorie.getMenu().getId())
//                    .orElseThrow(() -> new RuntimeException("Menu non trouvé"));
//            categoriy.setMenu(menu);
//            menu.getCategories().add(categoriy);
//            menuRepository.save(menu);
//        }
//
//        return categorieRepository.save(categorie);
        Categorie categoriy = new Categorie();
        categoriy.setNom(categorie.getNom());
        categoriy.setDescription(categorie.getDescription());
        categoriy.setArticles(categorie.getArticles());
        categoriy.setMenus(categorie.getMenus());

        if (categorie.getArticles() != null) {
            for (Article article : categorie.getArticles()) {
                article.setCategorie(categorie);
                articleRepository.save(article);
            }
        }

        if (categorie.getMenus() != null) {
            List<Menu> menus = categorie.getMenus().stream()
                    .map(menu -> menuRepository.findById(menu.getId())
                            .orElseThrow(() -> new RuntimeException("Menu non trouvé")))
                    .collect(Collectors.toList());

            categoriy.setMenus(menus);

            for (Menu menu : menus) {
                menu.getCategories().add(categoriy);
                menuRepository.save(menu);
            }
        }

        return categorieRepository.save(categoriy);
    }

    @Override
    public Categorie modifierCategorie(Categorie categorieUpdated) {
        // Vérifier si la catégorie existe dans la base de données
        Categorie categorie = categorieRepository.findById(categorieUpdated.getId())
                .orElseThrow(() -> new RuntimeException("Catégorie non trouvée pour l'ID : " + categorieUpdated.getId()));


        if (categorieUpdated.getNom() != null) {
            categorie.setNom(categorieUpdated.getNom());
        }
        if (categorieUpdated.getDescription() != null) {
            categorie.setDescription(categorieUpdated.getDescription());
        }
        if (categorieUpdated.getArticles() != null) {

            for (Article oldArticle : categorie.getArticles()) {
                oldArticle.setCategorie(null);
                articleRepository.save(oldArticle);
            }

            for (Article newArticle : categorieUpdated.getArticles()) {
                newArticle.setCategorie(categorieUpdated);
                articleRepository.save(newArticle);
            }
            categorie.setArticles(categorieUpdated.getArticles());
        }
//        if (categorieUpdated.getMenu() != null  ) {
//
//            Menu menu = menuRepository.findById(categorieUpdated.getMenu().getId())
//                    .orElseThrow(() -> new RuntimeException("Menu non trouvé"));
//            categorie.setMenu(menu);
//
//            if (!menu.getCategories().contains(categorie)) {
//                menu.getCategories().add(categorie);
//                menuRepository.save(menu);
//            }
//        }

        if (categorieUpdated.getMenus() != null) {
            List<Menu> menus = categorieUpdated.getMenus().stream()
                    .map(menu -> menuRepository.findById(menu.getId())
                            .orElseThrow(() -> new RuntimeException("Menu non trouvé")))
                    .collect(Collectors.toList());

            categorie.setMenus(menus);

            for (Menu menu : menus) {
                menu.getCategories().add(categorie);
                menuRepository.save(menu);
            }
        }
        return categorieRepository.save(categorie);
    }

    @Override
    public void supprimerCtegorie(int id) {
        Categorie categorie = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("categorie non trouvé pour l'ID : " + id));


        categorieRepository.delete(categorie);
    }

    @Override
    public List<Categorie> getAllCtegorie() {
        return categorieRepository.findAll();
    }

    @Override
    public Categorie getCtegorieByiD(int id) {
        Categorie categorie = categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("categorie non trouvé pour l'ID : " + id));
      return  categorie;
    }

}
