package com.restaurant.restaurant.Controllers;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Commande;
import com.restaurant.restaurant.Entites.CommandeArticle;
import com.restaurant.restaurant.Services.IServices.ICommandeServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/Commande")
@RequiredArgsConstructor
public class CommandeController {
    private final ICommandeServices commandeService;
    @PostMapping(path = "/add/{idClient}")
    public ResponseEntity<?> createCommande(@RequestBody Commande commandeDTO ,
                                            @PathVariable("idClient") long cliendId) {
        try {
            Commande commande = commandeService.createCommande(commandeDTO.getCommandeArticles(), cliendId);
            return new ResponseEntity<>(commande, HttpStatus.CREATED);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update/{commandeId}/{clientId}")
    public ResponseEntity<Commande> updateCommande(
            @PathVariable int commandeId,
            @RequestBody Commande updateRequest,
            @PathVariable long clientId) {

        try {
            Commande updatedCommande = commandeService.updateCommande(commandeId, updateRequest.getCommandeArticles(), clientId);
            return ResponseEntity.ok(updatedCommande);
        } catch (RuntimeException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/augmenterQuantite/{commandeId}/{articleId}")
    public ResponseEntity<Commande> augmenterQuantiteArticle(
            @PathVariable int commandeId,
            @PathVariable int articleId) {

        try {
            Commande updatedCommande = commandeService.augmenterQuantiteArticle(commandeId, articleId);
            return ResponseEntity.ok(updatedCommande);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PutMapping("/diminuerQuantite/{commandeId}/{articleId}")
    public ResponseEntity<Commande> diminuerQuantiteArticle(
            @PathVariable int commandeId,
            @PathVariable int articleId) {

        try {
            Commande updatedCommande = commandeService.diminuerQuantiteArticle(commandeId, articleId);
            return ResponseEntity.ok(updatedCommande);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @DeleteMapping("/delete/{commandeId}")
    public ResponseEntity<Void> supprimerCommande(@PathVariable int commandeId) {
        try {
            commandeService.supprimerCommande(commandeId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Commande>> getAllCommandes() {
        List<Commande> commandes = commandeService.getAllCommandes();
        return ResponseEntity.ok(commandes);
    }

    @GetMapping("/byClientId/{clientId}")
    public ResponseEntity<List<Commande>> getCommandesByClientId(@PathVariable long clientId) {
        List<Commande> commandes = commandeService.getCommandesByClientId(clientId);
        return ResponseEntity.ok(commandes);
    }
    @GetMapping("/{id}")
    public Commande getCommade(@PathVariable int id) {
        return commandeService.getCommandeById(id);
    }


    @GetMapping("/productivity-comparison/{agentId1}/{agentId2}")
    public ResponseEntity<Map<String, Object>> comparerProductivite(@PathVariable int agentId1, @PathVariable int agentId2) {
        int comptesAgent1 = commandeService.getCommandesByClientId(agentId1).size();
        int comptesAgent2 = commandeService.getCommandesByClientId(agentId2).size();

        Map<String, Object> resultat = new HashMap<>();
        resultat.put("agentId1", agentId1);
        resultat.put("comptesAgent1", comptesAgent1);
        resultat.put("agentId2", agentId2);
        resultat.put("comptesAgent2", comptesAgent2);

        return ResponseEntity.ok(resultat);
    }
    @GetMapping("/today")
    public Map<String, Object> getTodayOrderStats() {
        long count = commandeService.getCountOfTodayOrders();
        double totalAmount = commandeService.getTotalAmountOfTodayOrders();

        Map<String, Object> response = new HashMap<>();
        response.put("count", count);
        response.put("totalAmount", totalAmount);

        return response;
    }

}
