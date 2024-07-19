import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-commande',
  templateUrl: './update-commande.component.html',
  styleUrls: ['./update-commande.component.css'],
})
export class UpdateCommandeComponent implements OnInit {
  id!: number;
  commandeForm!: FormGroup;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeService,
    private fb: FormBuilder
  ) {}

  getUserIdFromLocalStorage(): void {
    const userConnectJson = localStorage.getItem('userconnect');
    if (userConnectJson) {
      const userConnect = JSON.parse(userConnectJson);
      this.userId = userConnect.id;
      console.log('User ID:', this.userId);
    } else {
      console.error('No user found in localStorage');
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.getCommandeById(this.id);
    });
    this.getUserIdFromLocalStorage();

    this.commandeForm = this.fb.group({
      dateCommande: [{ value: '', disabled: true }, Validators.required],
      commandeArticles: this.fb.array([]),
      montantTotal: [{ value: '', disabled: true }, Validators.required],
    });
  }

  get commandeArticles(): FormArray {
    return this.commandeForm.get('commandeArticles') as FormArray;
  }

  getCommandeById(id: number) {
    this.commandeService.getByICommannde(id).subscribe((data) => {
      this.commandeForm.patchValue({
        dateCommande: data.dateCommande,
        montantTotal: data.facture.montantTotal,
      });
      this.setCommandeArticles(data.commandeArticles);
    });
  }

  setCommandeArticles(articles: any[]) {
    const articlesFGs = articles.map((article) =>
      this.fb.group({
        id: [article.id],
        nom: [article.article.nom],
        description: [article.article.description],
        quantityStock: [article.article.quantityStock],
        prix: [article.article.prix],
        image: [article?.article.image],
        quantity: [article.quantity, Validators.required],
      })
    );
    const articlesFormArray = this.fb.array(articlesFGs);
    this.commandeForm.setControl('commandeArticles', articlesFormArray);
  }

  addArticle() {
    this.commandeArticles.push(
      this.fb.group({
        id: [],
        nom: ['', Validators.required],
        description: ['', Validators.required],
        quantityStock: [null],
        prix: [0, Validators.required],
        image: [''],
        quantity: [1, Validators.required],
      })
    );
  }

  removeArticle(index: number) {
    this.commandeArticles.removeAt(index);
  }

  increaseQuantity(index: number) {
    const quantity = this.commandeArticles.at(index).get('quantity')?.value;
    this.commandeArticles.at(index).patchValue({ quantity: quantity + 1 });
  }

  decreaseQuantity(index: number) {
    const quantity = this.commandeArticles.at(index).get('quantity')?.value;
    if (quantity > 1) {
      this.commandeArticles.at(index).patchValue({ quantity: quantity - 1 });
    }
  }

  calculateTotalAmount(commandeArticles: any[]): number {
    return commandeArticles.reduce((total: number, article: any) => {
      return total + article.quantity * article.prix;
    }, 0);
  }
  onSubmit() {
    if (this.commandeForm.valid) {
      const updatedCommande = this.prepareSaveCommande();
      this.commandeService
        .updateCommande(this.id, updatedCommande, this.userId)
        .subscribe(
          (response) => {
            console.log('Commande mise à jour avec succès', response);
          },
          (error) => {
            console.error(
              'Erreur lors de la mise à jour de la commande',
              error
            );
          }
        );
    }
  }

  prepareSaveCommande(): any {
    const formModel = this.commandeForm.getRawValue();
    const commandeArticlesDeepCopy: any[] = formModel.commandeArticles.map(
      (article: any) => Object.assign({}, article)
    );

    const saveCommande = {
      id: this.id,
      dateCommande: formModel.dateCommande,
      commandeArticles: commandeArticlesDeepCopy,
      facture: {
        id: this.id, // Assurez-vous que l'ID de la facture est correct
        montantTotal: this.calculateTotalAmount(commandeArticlesDeepCopy),
        dateCommande: formModel.dateCommande,
      },
    };
    return saveCommande;
  }
}
