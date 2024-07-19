package com.restaurant.restaurant.Services.ServiceImpl;

import com.restaurant.restaurant.Entites.*;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Repository.IArticleRepository;
import com.restaurant.restaurant.Repository.IClientRepository;
import com.restaurant.restaurant.Repository.ICommandeRepository;
import com.restaurant.restaurant.Repository.IFactureRepository;
import com.restaurant.restaurant.Services.IServices.ICommandeServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommandeServiceImplements implements ICommandeServices {
    private final ICommandeRepository commandeRepository ;
    private final IClientRepository clientRepository ;
    private final IArticleRepository articleRepository ;
    private final IFactureRepository factureRepository;

    @Override
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }
    @Override
    public Commande createCommande(List<CommandeArticle> commandeArticles, long clientId) {
        try {
            Commande commande = new Commande();
            commande.setDateCommande(new Date());
            try {
                Client client = clientRepository.findById(clientId)
                        .orElseThrow(() -> new RuntimeException("Client not found"));
                commande.setClient(client);
            } catch (RuntimeException e) {
                throw new RuntimeException("Error finding client: " + e.getMessage(), e);
            }
            for (CommandeArticle commandeArticle : commandeArticles) {
                Article article = articleRepository.findById(commandeArticle.getArticle().getId())
                        .orElseThrow(() -> new RuntimeException("Article not found with id: "
                                + commandeArticle.getArticle().getId()));
                if (article.getPrix() == null) {
                    throw new RuntimeException("Article price is null for article id: " + article.getId());
                }
                commandeArticle.setArticle(article);
                commandeArticle.setCommande(commande);
            }
            commande.setCommandeArticles(commandeArticles);
            try {
                commande = commandeRepository.save(commande);
            } catch (Exception e) {
                throw new RuntimeException("Error saving commande: " + e.getMessage(), e);
            }
            double montantTotal = commandeArticles.stream().mapToDouble(ca -> ca.getQuantity() * ca.getArticle().getPrix()).sum();
            Facture facture = new Facture();
            facture.setMontantTotal(montantTotal);
            facture.setDateCommande(new Date());
            facture.setCommande(commande);
            facture.setClient(commande.getClient());
            try {
                factureRepository.save(facture);
            } catch (Exception e) {
                throw new RuntimeException("Error saving facture: " + e.getMessage(), e);
            }
            return commande;
        } catch (RuntimeException e) {
            throw new RuntimeException("Error creating commande: " + e.getMessage(), e);
        }
    }

//    public Commande createCommande(List<CommandeArticle> commandeArticles, long clientId) {
//        try {
//            Commande commande = new Commande();
//            commande.setDateCommande(new Date());
//
//            try {
//                Client client = clientRepository.findById(clientId).orElseThrow(() -> new RuntimeException("Client not found"));
//                commande.setClient(client);
//            } catch (RuntimeException e) {
//                throw new RuntimeException("Error finding client: " + e.getMessage(), e);
//            }
//
//            for (CommandeArticle commandeArticle : commandeArticles) {
//                commandeArticle.setCommande(commande);
//            }
//            commande.setCommandeArticles(commandeArticles);
//
//            try {
//                return commandeRepository.save(commande);
//            } catch (Exception e) {
//                throw new RuntimeException("Error saving commande: " + e.getMessage(), e);
//            }
//        } catch (RuntimeException e) {
//            throw new RuntimeException("Error creating commande: " + e.getMessage(), e);
//        }
//
//    }


    public Commande updateCommande(int commandeId, List<CommandeArticle> updatedCommandeArticles, long clientId) {
        try {
            Commande commande = commandeRepository.findById(commandeId)
                    .orElseThrow(() -> new RuntimeException("Commande not found"));

            Client client = clientRepository.findById(clientId)
                    .orElseThrow(() -> new RuntimeException("Client not found"));
            commande.setClient(client);

            commande.getCommandeArticles().clear();

            double montantTotal = 0;

            for (CommandeArticle updatedCommandeArticle : updatedCommandeArticles) {
                Article article = articleRepository.findById(updatedCommandeArticle.getArticle().getId())
                        .orElseThrow(() -> new RuntimeException("Article not found"));

                if (article.getPrix() == null) {
                    throw new RuntimeException("Article price is null for article id: " + article.getId());
                }

                updatedCommandeArticle.setArticle(article);
                updatedCommandeArticle.setCommande(commande);
                commande.getCommandeArticles().add(updatedCommandeArticle);

                // Calculate the total amount
                montantTotal += updatedCommandeArticle.getQuantity() * article.getPrix();
            }

            // Update the date and total amount
            commande.setDateCommande(new Date());

            // Update the related facture with the new total amount and order date
            if (commande.getFacture() != null) {
                Facture facture = commande.getFacture();
                facture.setMontantTotal(montantTotal);
                facture.setDateCommande(new Date());
                factureRepository.save(facture);
            }

            return commandeRepository.save(commande);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error updating commande: " + e.getMessage(), e);
        }
    }

    @Override
    public Commande augmenterQuantiteArticle(int commandeId, int articleId) {
        Commande commande = commandeRepository.findById(commandeId).orElseThrow(() -> new RuntimeException("Commande not found"));
        Optional<CommandeArticle> optionalCommandeArticle = commande.getCommandeArticles().stream().filter(ca -> ca.getArticle().getId() == articleId).findFirst();
        if (optionalCommandeArticle.isPresent()) {
            CommandeArticle commandeArticle = optionalCommandeArticle.get();
            commandeArticle.setQuantity(commandeArticle.getQuantity() + 1);
            return commandeRepository.save(commande);
        } else {
            throw new RuntimeException("Article not found in commande");
        }
    }
    @Override
    public Commande diminuerQuantiteArticle(int commandeId, int articleId) {
        Commande commande = commandeRepository.findById(commandeId) .orElseThrow(() -> new RuntimeException("Commande not found"));
        Optional<CommandeArticle> optionalCommandeArticle = commande.getCommandeArticles().stream().filter(ca -> ca.getArticle().getId() == articleId).findFirst();
        if (optionalCommandeArticle.isPresent()) {
            CommandeArticle commandeArticle = optionalCommandeArticle.get();
            if (commandeArticle.getQuantity() > 1) {
                commandeArticle.setQuantity(commandeArticle.getQuantity() - 1);
            } else {
                commande.getCommandeArticles().remove(commandeArticle);
            }
            return commandeRepository.save(commande);
        } else {
            throw new RuntimeException("Article not found in commande");
        }
    }

    @Override
    public void supprimerCommande(int commandeId) {
        Commande commande = commandeRepository.findById(commandeId)
                .orElseThrow(() -> new RuntimeException("Commande not found"));
        commandeRepository.delete(commande);
    }

    @Override
    public List<Commande> getCommandesByClientId(long clientId) {
        return commandeRepository.findByClient_Id(clientId);
    }

    @Override
    public double getTotalAmountOfTodayOrders() {
        List<Commande> commandes = commandeRepository.findAllByDateCommandeToday();
        return commandes.stream().mapToDouble(c ->
                c.getCommandeArticles().stream().mapToDouble(ca -> ca.getArticle().getPrix() * ca.getQuantity()).sum()
        ).sum();
    }

    @Override
    public long getCountOfTodayOrders() {
        return commandeRepository.findAllByDateCommandeToday().size();
    }

    @Override
    public Commande getCommandeById(int idCommande) {
        Commande commande=commandeRepository.findById(idCommande).orElseThrow(()-> new RessourceNotFound("commande  n'exite pas avec id"+idCommande));
        return commande;
    }
}
