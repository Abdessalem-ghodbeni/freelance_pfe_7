import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paiement } from 'src/app/core/models/Paiement/paiement.enum';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';
import { FactureService } from 'src/app/core/services/Facture/facture.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture-ticket',
  templateUrl: './facture-ticket.component.html',
  styleUrls: ['./facture-ticket.component.css'],
})
export class FactureTicketComponent implements OnInit {
  facture: any;
  @Input() idcommande: number | undefined;
  @Input() modepaiment: Paiement | undefined;
  @Input() idFacture: number | undefined;
  id!: number;
  commandeArticleListe!: any[];
  modePaiementFacture!: string;
  ListeArticleConstituantCommande!: any[];
  constructor(
    private route: ActivatedRoute,
    private commande_services: CommandeService,
    private facture_service: FactureService
  ) {}

  ngOnInit(): void {
    if (this.idcommande !== undefined) {
      this.RecupererCommandeAssociéAfACTUREParId(this.idcommande);
    }
    if (this.idFacture !== undefined) {
      this.RecupererFactureParId(this.idFacture);
      console.log(this.idFacture, 'sss');
    }
    if (this.modepaiment != undefined) {
      this.modePaiementFacture = this.modepaiment;
    }
  }
  RecupererFactureParId(id: number): void {
    if (this.idFacture !== undefined) {
      this.facture_service.getFactureById(this.idFacture).subscribe(
        (data: any) => {
          this.facture = data;
          console.log('Facture récupéré avec succès:', this.facture);
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

  downloadPDF() {
    const DATA = document.getElementById('pdfContent') as HTMLElement;
    if (!DATA) {
      console.error('Element with id "pdfContent" not found.');
      return;
    }
    html2canvas(DATA).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('facture.pdf');
    });
  }

  RecupererCommandeAssociéAfACTUREParId(id: number): void {
    this.commande_services.getByICommannde(id).subscribe(
      (data: any) => {
        this.ListeArticleConstituantCommande = data?.commandeArticles || [];
        console.log('commande récupéré  :', data);
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
