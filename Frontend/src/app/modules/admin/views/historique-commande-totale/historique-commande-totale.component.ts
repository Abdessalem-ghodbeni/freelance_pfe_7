import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';

@Component({
  selector: 'app-historique-commande-totale',
  templateUrl: './historique-commande-totale.component.html',
  styleUrls: ['./historique-commande-totale.component.css'],
})
export class HistoriqueCommandeTotaleComponent implements OnInit {
  ListeTotaleCommandes!: any[];
  nbCommande!: any;
  nbCommandeOggi!: any;

  constructor(private commande_services: CommandeService) {}

  ngOnInit(): void {
    this.commande_services.getAllCommande().subscribe({
      next: (data: any) => {
        this.ListeTotaleCommandes = data;
        console.log('totale cmd', data);
        this.nbCommande = data.length;
      },
      error: () => {
        alert('somthing was warrning...');
      },
    });

    this.commande_services.getOggiCommande().subscribe({
      next: (data: any) => {
        this.nbCommandeOggi = data.count;
      },
      error: () => {
        console.error('Failed to fetch data from API');
      },
    });
  }
}
