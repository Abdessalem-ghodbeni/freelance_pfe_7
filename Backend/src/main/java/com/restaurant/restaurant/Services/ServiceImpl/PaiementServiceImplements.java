package com.restaurant.restaurant.Services.ServiceImpl;

import com.restaurant.restaurant.Entites.Commande;
import com.restaurant.restaurant.Entites.Facture;
import com.restaurant.restaurant.Entites.ModePaiment;
import com.restaurant.restaurant.Entites.Paiement;
import com.restaurant.restaurant.Repository.ICommandeRepository;
import com.restaurant.restaurant.Repository.IFactureRepository;
import com.restaurant.restaurant.Repository.IPaiementRepository;
import com.restaurant.restaurant.Services.IServices.IPaiementServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Slf4j
@RequiredArgsConstructor
public class PaiementServiceImplements implements IPaiementServices {
    private final IPaiementRepository paiementRepository;
    private final ICommandeRepository commandeRepository;
    private final IFactureRepository factureRepository;
    @Override
    @Transactional
    public Paiement  ajouterPaiement(int commandeId, ModePaiment modePaiment) {
        Commande commande = commandeRepository.findById(commandeId).orElseThrow(() -> new RuntimeException("Commande non trouvée"));

        Paiement paiement = new Paiement();
        paiement.setDatePaiement(new Date());
        paiement.setModePaiment(modePaiment);
        paiement.setCommande(commande);

        return paiementRepository.save(paiement);
    }
}
