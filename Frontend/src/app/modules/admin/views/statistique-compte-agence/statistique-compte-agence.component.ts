import { Component, OnInit } from '@angular/core';

import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import { ClientService } from 'src/app/core/services/Client/client.service';
import { ArticleService } from 'src/app/core/services/Article/article.service';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';
import { CategorieService } from 'src/app/core/services/Ctergorie/categorie.service';

@Component({
  selector: 'app-statistique-compte-agence',
  templateUrl: './statistique-compte-agence.component.html',
  styleUrls: ['./statistique-compte-agence.component.css'],
})
export class StatistiqueCompteAgenceComponent implements OnInit {
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
  totaleVendue!: number;

  chartData: ChartData<'bar'> = {
    labels: [
      ' Articles jamais vendue',
      'Totale des Articles',
      'Article Vendue au moins une fois',
    ],
    datasets: [
      {
        label: 'Nombre de Articles ',
        data: [0, 0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  // , '#FFCE56', '#FF5733'
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Statistiques des types de comptes',
      },
    },
  };

  chart!: Chart;

  constructor(
    private clientService: ClientService,
    private article_service: ArticleService,
    private commande_services: CommandeService,
    private categorie_service: CategorieService
  ) {}

  ngOnInit() {
    this.article_service.getAllNonVendueArticles().subscribe({
      next: (data: any) => {
        this.totaleAccountChequier = data;
        this.article_service.getAllVendueArticles().subscribe({
          next: (data: any) => {
            this.totaleVendue = data;
          },
          error: () => {},
        });
        this.article_service.getAllArticles().subscribe({
          next: (data: any) => {
            this.totaleAcount = data.length;
            this.updateChartData();
          },
          error: () => {},
        });
      },
      error: () => {},
    });
  }

  updateChartData() {
    this.chartData.datasets[0].data = [
      this.totaleAccountChequier,
      this.totaleAcount,
      this.totaleVendue,
    ];
    this.chart.update();
  }

  ngAfterViewInit() {
    this.chart = new Chart('compteTypeChart', {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions,
    });
  }
}
