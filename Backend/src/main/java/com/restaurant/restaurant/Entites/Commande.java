package com.restaurant.restaurant.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Commande implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id ;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCommande;

    @JsonIgnore
    @ManyToOne
    Client client;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
    List<CommandeArticle> commandeArticles;

    @JsonIgnore
    @OneToOne(mappedBy = "commande", cascade = CascadeType.ALL)
    Paiement paiement;


    @OneToOne(mappedBy = "commande", cascade = CascadeType.ALL)
    Facture facture;

}
