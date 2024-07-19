package com.restaurant.restaurant.Services.IServices;

import com.restaurant.restaurant.Entites.ModePaiment;
import com.restaurant.restaurant.Entites.Paiement;

public interface IPaiementServices {

    public Paiement ajouterPaiement(int commandeId, ModePaiment modePaiment);

}
