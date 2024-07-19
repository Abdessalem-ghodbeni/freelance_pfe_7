import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';

import { ClientService } from 'src/app/core/services/Client/client.service';
import { ArticleService } from 'src/app/core/services/Article/article.service';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';
import { CategorieService } from 'src/app/core/services/Ctergorie/categorie.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css'],
})
export class StatistiquesComponent implements OnInit {
  listeAgence!: any[];
  showMe: boolean = false;

  listAgents: any[] = [];
  agentId1!: number;
  agentId2!: number;
  NbCompteCreatedByAgentNumberOne!: number;
  NbCompteCreatedBySecondAgent!: number;
  selectedAgenceId!: number;
  nbCompteByAgence!: number;
  totaleAcount!: number;
  totaleClient!: number;
  totaleAgent!: number;
  totaleAgence!: number;
  totaleAcountEpargne!: number;
  totaleAcountCourant!: number;
  totaleAccountChequier!: number;
  listeClient!: any[];
  constructor(
    private clientService: ClientService,
    private article_service: ArticleService,
    private commande_services: CommandeService,
    private categorie_service: CategorieService
  ) {}

  ngOnInit() {
    this.article_service.getAllArticles().subscribe({
      next: (data: any) => {
        this.totaleAcount = data.length;
      },
      error: () => {},
    });

    this.categorie_service.getCategorie().subscribe({
      next: (data: any) => {
        this.totaleAgence = data.length;
      },
      error: () => {},
    });

    this.clientService.getClient().subscribe({
      next: (data: any) => {
        this.totaleClient = data.length;
        this.listeClient = data;
        console.log('eeeeeeeeeeeee', this.listeClient);
        console.log('azertyyyy', this.totaleClient);
      },
      error: () => {},
    });

    this.categorie_service.getCategorie().subscribe({
      next: (data: any) => {
        this.listeAgence = data;
      },
      error: () => {},
    });

    this.commande_services.getAllCommande().subscribe({
      next: (data: any) => {
        this.totaleAgent = data.length;
      },
      error: () => {},
    });

    this.createChart();
  }

  onAgenceChange(event: any) {
    this.selectedAgenceId = event.target.value;

    console.log('Selected Agence ID:', this.selectedAgenceId);
  }

  onAgentOneChange(event: any) {
    this.agentId1 = event.target.value;
    console.log('Selected Agent ID:', this.agentId1);
  }

  onAgentSecondChange(event: any) {
    this.agentId2 = event.target.value;
    console.log('Selected Agent ID:', this.agentId2);
  }

  updateCounter() {
    const purecounterElements = document.querySelectorAll(
      '.purecounterAccount'
    );
    purecounterElements.forEach((element) => {
      element.setAttribute(
        'data-purecounter-end',
        this.totaleAcount.toString()
      );
    });
  }

  updateCounterAgence() {
    const purecounterElements = document.querySelectorAll('.purecounterAgence');
    purecounterElements.forEach((element) => {
      element.setAttribute(
        'data-purecounter-end',
        this.totaleAgence.toString()
      );
    });
  }

  updateCounterClient() {
    const purecounterElements = document.querySelectorAll('.purecounterClient');
    purecounterElements.forEach((element) => {
      element.setAttribute(
        'data-purecounter-end',
        this.totaleClient.toString()
      );
    });
  }

  updateCounterAgent() {
    const purecounterElements = document.querySelectorAll('.purecounterAgents');
    purecounterElements.forEach((element) => {
      element.setAttribute('data-purecounter-end', this.totaleAgent.toString());
    });
  }

  lancerComparaison() {
    if (this.agentId1 && this.agentId2) {
      this.loadAgentProductivityData();
      this.showMe = true;
    } else {
      console.error(
        'Veuillez sélectionner deux client pour lancer la comparaison.'
      );
    }
  }

  loadAgentProductivityData() {
    this.commande_services
      .getAgentProductivityComparison(this.agentId1, this.agentId2)
      .subscribe(
        (data: any) => {
          this.NbCompteCreatedByAgentNumberOne = data?.comptesAgent1;
          this.NbCompteCreatedBySecondAgent = data.comptesAgent2;
          console.log(
            this.totaleAgent,
            this.NbCompteCreatedByAgentNumberOne,
            this.NbCompteCreatedBySecondAgent
          );
          this.createChart();
        },
        (error) => {
          console.error(
            'Error fetching agent productivity comparison data',
            error
          );
        }
      );
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Nombre Totale des commandes',
          'Nombre des commande Crées par premiére client',
          'Nombre des commande Crées par deusiéme client',
        ],
        datasets: [
          {
            label: 'My First Dataset',
            data: [
              this.totaleAgent,
              this.NbCompteCreatedByAgentNumberOne,
              this.NbCompteCreatedBySecondAgent,
            ],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }
}
