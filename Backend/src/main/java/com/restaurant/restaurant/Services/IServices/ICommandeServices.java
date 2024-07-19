package com.restaurant.restaurant.Services.IServices;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Commande;
import com.restaurant.restaurant.Entites.CommandeArticle;

import java.util.List;

public interface ICommandeServices {
    Commande createCommande(List<CommandeArticle> commandeArticles, long clientId);
    Commande updateCommande(int commandeId, List<CommandeArticle> updatedCommandeArticles, long clientId);
    public Commande augmenterQuantiteArticle(int commandeId, int articleId);
    Commande diminuerQuantiteArticle(int commandeId, int articleId);
    void supprimerCommande(int commandeId);
    List<Commande> getAllCommandes();
    List<Commande> getCommandesByClientId(long clientId);

    double getTotalAmountOfTodayOrders();
    long getCountOfTodayOrders();
    Commande getCommandeById(int idCommande);

}
