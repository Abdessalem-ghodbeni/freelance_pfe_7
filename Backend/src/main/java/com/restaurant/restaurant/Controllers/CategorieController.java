package com.restaurant.restaurant.Controllers;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Categorie;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Services.ServiceImpl.CategorieServiceImplements;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/Categorie")
@RequiredArgsConstructor
public class CategorieController {
private  final CategorieServiceImplements categorieServiceImplements;

    @PostMapping(path = "/add")
    public ResponseEntity<?> AjouterCompte(@RequestBody Categorie categorie) {
        try {
            return new ResponseEntity<>(categorieServiceImplements.ajouterCategorie(categorie), HttpStatus.CREATED);
        } catch (RessourceNotFound exception) {
            return new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Categorie> dassignAgentFromAgence(@RequestBody Categorie categorie) {
        Categorie updateCategorie = categorieServiceImplements.modifierCategorie(categorie);
        return ResponseEntity.ok(updateCategorie);
    }

    @DeleteMapping(path = "/supprimer/{id}")
    public ResponseEntity<String> SupprimerArticle(@PathVariable("id") int articleId) {
        try {
            categorieServiceImplements.supprimerCtegorie(articleId);
            return ResponseEntity.ok("categorie deleted Successfuly");
        } catch (RessourceNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllArticles() {

        try {
            List<Categorie> Agents = categorieServiceImplements.getAllCtegorie();
            if (Agents.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Liste est vide ");
            }
            return ResponseEntity.ok(Agents);
        } catch (RessourceNotFound exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("quelque chose mal passé"+exception.getMessage());
        }
    }
    @GetMapping("/{id}")
    public Categorie getArticleByIdWithDetails(@PathVariable int id) {
        return categorieServiceImplements.getCtegorieByiD(id);
    }


}
