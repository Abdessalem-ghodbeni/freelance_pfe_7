package com.restaurant.restaurant.Services.ServiceImpl;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Facture;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Repository.IFactureRepository;
import com.restaurant.restaurant.Services.IServices.IFactureServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class FactureServiceImplements implements IFactureServices {
    private final IFactureRepository factureRepository;
    @Override
    public Facture getFactureByiD(int factureId) {
        Facture facture=factureRepository.findById(factureId).orElseThrow(()-> new RessourceNotFound("facture n'exite pas avec id"+factureId));
        return facture;
    }

    @Override
    public List<Facture> getAllFactures() {
       return factureRepository.findAll();
    }

    @Override
    public void deleteFacture(int idFacture) {
        Facture facture = factureRepository.findById(idFacture)
                .orElseThrow(() -> new RuntimeException("facture non trouvé pour l'ID : " + idFacture));


        factureRepository.delete(facture);
    }
}
