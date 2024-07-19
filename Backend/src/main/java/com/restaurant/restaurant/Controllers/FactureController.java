package com.restaurant.restaurant.Controllers;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Facture;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Services.IServices.IFactureServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/Facture")
@RequiredArgsConstructor
public class FactureController {
    private final IFactureServices factureServices;

    @GetMapping("GetById/{id}")
    public Facture GetFactureById(@PathVariable int id) {
        return factureServices.getFactureByiD(id);
    }


    @GetMapping(path = "/all")
    public ResponseEntity<?> getAllFactures() {

        try {
            List<Facture> factures = factureServices.getAllFactures();
            if (factures.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body("Liste est vide ");
            }
            return ResponseEntity.ok(factures);
        } catch (RessourceNotFound exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("quelque chose mal passé"+exception.getMessage());
        }
    }

    @DeleteMapping(path = "/supprimer/{id}")
    public ResponseEntity<String> SupprimerFacture(@PathVariable("id") int factureId) {
        try {
            factureServices.deleteFacture(factureId);
            return ResponseEntity.ok("facture deleted Successfuly");
        } catch (RessourceNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}
