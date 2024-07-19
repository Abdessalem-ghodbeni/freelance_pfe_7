package com.restaurant.restaurant.Controllers;

import com.restaurant.restaurant.Entites.ModePaiment;
import com.restaurant.restaurant.Entites.Paiement;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Services.ServiceImpl.PaiementServiceImplements;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/Paiment")
@RequiredArgsConstructor
public class PaimentController {
    private final PaiementServiceImplements paiementServiceImplements;

//    @PostMapping(path = "/add")
//    public ResponseEntity<?> AjouterCompte(@RequestBody Paiement paiement) {
//        try {
//            return new ResponseEntity<>(paiementServiceImplements.ajouterPaiement(paiement), HttpStatus.CREATED);
//        } catch (RessourceNotFound exception) {
//            return new ResponseEntity<>(exception.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
@PostMapping("/ajouter")
public Paiement ajouterPaiement(@RequestParam int commandeId, @RequestParam ModePaiment modePaiment) {
    return paiementServiceImplements.ajouterPaiement(commandeId, modePaiment);
}

//    @PostMapping(path = "/add")
//    public Paiement createPaiement(@RequestBody Map<String, Object> paiementData) {
//        return paiementServiceImplements.ajouterPaiement(paiementData);
//    }
}
