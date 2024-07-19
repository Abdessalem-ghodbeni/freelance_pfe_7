package com.restaurant.restaurant.Services.ServiceImpl;

import com.restaurant.restaurant.Entites.Article;
import com.restaurant.restaurant.Entites.Client;
import com.restaurant.restaurant.Exception.RessourceNotFound;
import com.restaurant.restaurant.Repository.IClientRepository;
import com.restaurant.restaurant.Services.IServices.IClientServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ClientServicesImpl implements IClientServices {
    private final IClientRepository clientRepository;

    @Override
    public Client getClientById(long id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Client> getAllClient() {
        return  clientRepository.findAll();
    }

    @Override
    public Client updateClient(Client client) {
        Optional<Client> clientOptional = clientRepository.findById(client.getId());
        if (clientOptional.isPresent()) {
            Client clientReadyToUpdate = clientOptional.get();
            clientReadyToUpdate.setNom(client.getNom());
            clientReadyToUpdate.setPrenom(client.getPrenom());
            clientReadyToUpdate.setCin(client.getCin());
            clientReadyToUpdate.setImage(client.getImage());
            clientReadyToUpdate.setNumeroTelephone(client.getNumeroTelephone());
            clientReadyToUpdate.setDateNaissance(client.getDateNaissance());
            clientReadyToUpdate.setEmail(client.getEmail());
            clientReadyToUpdate.setPassword(client.getPassword());
            clientReadyToUpdate.setAdresse(client.getAdresse());
            return clientRepository.save(clientReadyToUpdate);
        } else {
            throw new RessourceNotFound("Client not found with id: " + client.getId());
        }
    }

    @Override
    public void supprimerclient(long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article non trouvé pour l'ID : " + id));


        clientRepository.delete(client);
    }

}
