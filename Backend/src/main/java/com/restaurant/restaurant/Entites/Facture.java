package com.restaurant.restaurant.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Facture implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id ;

    @Column(name = "montantTotal")
    private Double montantTotal;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCommande;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "commande_id")
    Commande commande;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "client_id")
    Client client;
}
