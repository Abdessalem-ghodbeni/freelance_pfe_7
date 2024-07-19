package com.restaurant.restaurant.Entites;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="Client")
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class Client extends User {

    @Column(name="cin")
    long cin;

    @Temporal(TemporalType.DATE)
    Date dateNaissance;

    @Column(name="adresse")
    String adresse;

    String image;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Commande> commandes;

    public Client(int id) {
        super.setId(id); // Assurez-vous que la classe User a un setter pour l'ID
    }

}
