import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paiement } from 'src/app/core/models/Paiement/paiement.enum';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';
import { FactureService } from 'src/app/core/services/Facture/facture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-commande-a-payer',
  templateUrl: './details-commande-a-payer.component.html',
  styleUrls: ['./details-commande-a-payer.component.css'],
})
export class DetailsCommandeAPayerComponent implements OnInit {
  commande: any;
  id!: number;
  idFacture!: number;
  idcommande!: number;
  GetFacture: boolean = false;
  modepaiment: any = 'CARTE_BANCAIRE';
  ListeArticleConstituantCommande!: any[];
  constructor(
    private route: ActivatedRoute,
    private commande_services: CommandeService,
    private _router: Router,
    private facture_service: FactureService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('welcome', this.id);
      this.idcommande = this.id;
      this.RecupererCommandeParId(this.id);
      this.facture_service.idCommande = this.id;
    });
  }

  setModePaiement() {
    this.modepaiment = Paiement.ESPECE;
  }
  setModePaiementCard() {
    this.modepaiment = Paiement.CARTE_BANCAIRE;
  }

  payeCommande() {
    const formData = new FormData();
    formData.append('commandeId', this.id.toString());
    formData.append('modePaiment', this.modepaiment);

    this.commande_services.AjouterPaiement(formData).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Transaction  réussie',
          text: 'Vous pouvez voir la liste des paiement',
          showConfirmButton: false,
          timer: 1500,
        });
        // this._router.navigate([
        //   '/client/facture/',
        //   response.commande?.facture?.id,
        // ]);
        this.idFacture = response.commande?.facture?.id;
        this.GetFacture = true;
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de transaction du paiement',
          footer: 'Veuillez réessayer',
        });
      }
    );
  }

  RecupererCommandeParId(id: number): void {
    this.commande_services.getByICommannde(id).subscribe(
      (data: any) => {
        this.commande = data;
        this.ListeArticleConstituantCommande = data.commandeArticles;
        console.log('commande récupéré avec succès:', this.commande);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Somthing was warrning',
          footer: 'Veuillez réessayer',
        });
      }
    );
  }
}
