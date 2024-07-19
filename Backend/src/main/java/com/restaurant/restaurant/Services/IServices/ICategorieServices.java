package com.restaurant.restaurant.Services.IServices;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Categorie;

import java.util.List;

public interface ICategorieServices {
    Categorie ajouterCategorie (Categorie categorie);
    Categorie modifierCategorie(Categorie categorieUpdated);
    public void supprimerCtegorie(int id);
    public List<Categorie> getAllCtegorie();
    Categorie  getCtegorieByiD(int id);
}
