package com.restaurant.restaurant.Services.IServices;

import com.restaurant.restaurant.Entites.Client;

import java.util.List;

public interface IClientServices {
    Client getClientById(long id);
    List<Client> getAllClient();
    Client updateClient(Client client);
    public void supprimerclient(long id);

}
