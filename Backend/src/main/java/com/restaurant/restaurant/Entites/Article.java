package com.restaurant.restaurant.Entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Article implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id ;

    @Column(name = "nom")
    String nom;


    @Column(name = "description", length = 1000)
    String description;

    @Column(name = "quantity_Stock")
    Double quantityStock;

    @Column(name = "prix")
    Double prix;

    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    List<CommandeArticle> commandeArticles;
@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "categorie_id")
    Categorie categorie ;



}
