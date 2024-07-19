package com.restaurant.restaurant.Services.IServices;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Facture;

import java.util.List;

public interface IFactureServices {
    Facture getFactureByiD(int factureId);
    List<Facture> getAllFactures();
    void deleteFacture(int idFacture);
}
