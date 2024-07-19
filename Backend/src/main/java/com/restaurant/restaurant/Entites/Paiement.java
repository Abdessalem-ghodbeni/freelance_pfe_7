package com.restaurant.restaurant.Entites;

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
public class Paiement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id ;

    @Temporal(TemporalType.TIMESTAMP)
    private Date datePaiement;

    @Enumerated(EnumType.STRING)
    @Column(name = "modePaiement")
    private ModePaiment modePaiment;

    @OneToOne
    @JoinColumn(name = "commande_id")
    Commande commande ;
}
