import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/Article/article.service';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';
import { CategorieService } from 'src/app/core/services/Ctergorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passer-commande',
  templateUrl: './passer-commande.component.html',
  styleUrls: ['./passer-commande.component.css'],
})
export class PasserCommandeComponent implements OnInit, OnChanges {
  clientId: any;
  showMe: Boolean = false;
  listeArticles!: any[];
  image!: string;
  panier: any[] = [];
  isCartVisible: boolean = false;
  isNotSelected: boolean = false;
  totalAPayer: number = 0;
  categories: any[] = [];
  // listeArticles: any[] = [];
  filteredArticles: any[] = [];
  constructor(
    private articles_services: ArticleService,
    private commande_servic: CommandeService,
    private _router: Router,
    private categorieS: CategorieService
  ) {}

  addToCart(article: any): void {
    const existingItem = this.panier.find((item) => item.id === article.id);
    if (existingItem) {
      existingItem.quantite++;
      this.calculateTotal();
    } else {
      article.quantite = 1;
      this.panier.push(article);
      this.isCartVisible = true;
      this.calculateTotal();
    }
    if (this.panier.length > 0) {
      this.isNotSelected = true;
    } else {
      this.isNotSelected = false;
    }
    this.calculateTotal();
  }
  removeFromCart(item: any): void {
    this.panier = this.panier.filter((article) => article.id !== item.id);
    if (this.panier.length === 0) {
      this.isCartVisible = false;
    }
    this.calculateTotal();
  }
  calculateItemTotal(item: any): number {
    return item.quantite * item.prix;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.panier.length > 0) {
      this.isNotSelected = true;
    } else {
      this.isNotSelected = false;
    }
  }

  // ngOnInit(): void {
  //   const userConnect = localStorage.getItem('userconnect');
  //   if (userConnect) {
  //     const user = JSON.parse(userConnect);
  //     this.clientId = user.id;
  //   }
  //   this.articles_services.getAllArticles().subscribe({
  //     next: (data: any) => {
  //       this.listeArticles = data;
  //       console.log('ee', this.listeArticles);
  //     },
  //     error: () => {},
  //   });
  // }
  getAllArticles(): any[] {
    return this.categories.flatMap((category) => category.articles);
  }
  selectedCategory: string = 'All';

  filterArticles(categoryName: string): void {
    this.selectedCategory = categoryName;
    if (categoryName === 'All') {
      this.filteredArticles = this.getAllArticles();
    } else {
      const category = this.categories.find((cat) => cat.nom === categoryName);
      this.filteredArticles = category ? category.articles : [];
    }
  }
  ngOnInit(): void {
    this.categorieS.getCategorie().subscribe(
      (data) => {
        this.categories = data;
        this.filteredArticles = this.getAllArticles();
      },
      (error) => {
        console.log('Error fetching categories', error);
      }
    );
  }

  getImageUrl(image: string): string {
    const baseUrl = 'http://localhost:8089/Restaurant/article';
    return `${baseUrl}/${image}`;
  }

  // Fonction pour calculer le total à payer
  // calculateTotal(): void {
  //   this.totalAPayer = this.panier.reduce(
  //     (total, item) => total + item.quantite * item.prix,
  //     0
  //   );
  // }
  calculateTotal(): void {
    this.totalAPayer = this.panier.reduce(
      (total, item) => total + item.quantite * item.prix,
      0
    );
  }

  createCommande(): void {
    const commandeArticles = this.panier.map((item) => ({
      article: { id: item.id },
      quantity: item.quantite,
    }));

    const payload = {
      commandeArticles: commandeArticles,
    };
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.clientId = user.id;
    }

    this.commande_servic.AjouterCommande(payload, this.clientId).subscribe(
      (response: any) => {
        const nouvelleCommandeId = response.id;

        Swal.fire({
          icon: 'success',
          title: 'operation  réussie',
          text: 'Vous pouvez voir la liste des article',
          showConfirmButton: false,
          timer: 1500,
        });
        this._router.navigate([
          '/client/details-commande-aPaye/',
          nouvelleCommandeId,
        ]);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Une erreur est survenue lors de l'ajout du article",
          footer: 'Veuillez réessayer',
        });
      }
    );
  }
  decrementQuantity(item: any) {
    if (item.quantite > 1) {
      item.quantite--;
      this.calculateItemTotal(item);
    }
  }

  incrementQuantity(item: any): void {
    this.articles_services.getArticleQuantite(item.id).subscribe({
      next: (quantite: any) => {
        if (quantite === null || quantite >= item.quantityStock + 1) {
          item.quantite++;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Quantité non disponible',
            text: 'La quantité demandée est supérieure à la quantité disponible.',
          });
        }
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération de la quantité:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s'est produite lors de la récupération de la quantité.",
        });
      },
    });
  }
}
