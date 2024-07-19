package com.restaurant.restaurant.Repository;

import com.restaurant.restaurant.Entites.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClientRepository extends JpaRepository<Client,Long> {
    Client findByEmail(String email);

}
