import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration, ChartType, ChartDataset } from 'chart.js';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';

@Component({
  selector: 'app-statistique-commande-oggi',
  templateUrl: './statistique-commande-oggi.component.html',
  styleUrls: ['./statistique-commande-oggi.component.css'],
})
export class StatistiqueCommandeOggiComponent implements OnInit {
  count!: number;
  totaleArgent!: number;

  constructor(private commande_services: CommandeService) {}

  ngOnInit(): void {
    this.commande_services.getOggiCommande().subscribe({
      next: (data: any) => {
        this.count = data.count;
        this.totaleArgent = data.totalAmount;
        this.createChart(this.totaleArgent, this.count); // Appeler createChart après avoir reçu les données
      },
      error: () => {
        console.error('Failed to fetch data from API');
      },
    });
  }

  public chart!: Chart;
  public chartConfig!: ChartConfiguration<'line'>;

  createChart(totalAmount: number, count: number) {
    const labels = ['Nombre des commandes', 'Somme de recette de ce jour'];
    const chartData: ChartDataset<'line'>[] = [
      {
        label: "Today's Sales Data",
        data: [count, totalAmount],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ];

    this.chartConfig = {
      type: 'line',
      data: {
        labels: labels,
        datasets: chartData,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const canvas = document.getElementById('mmm') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, this.chartConfig);
    } else {
      console.error('Failed to get canvas context');
    }
  }
}
