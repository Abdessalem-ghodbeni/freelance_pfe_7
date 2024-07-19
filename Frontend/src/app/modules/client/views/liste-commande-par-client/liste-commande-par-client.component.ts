import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/core/services/Commande/commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-commande-par-client',
  templateUrl: './liste-commande-par-client.component.html',
  styleUrls: ['./liste-commande-par-client.component.css'],
})
export class ListeCommandeParClientComponent implements OnInit {
  requests: any[] = [];
  clientId: any;
  public noData!: TemplateRef<NgIfContext<boolean>>;
  rechercherDemande: string = '';
  constructor(
    private commande_services: CommandeService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.getAllCommandeByClientId();
  }
  getAllCommandeByClientId(): void {
    const userConnect = localStorage.getItem('userconnect');
    if (userConnect) {
      const user = JSON.parse(userConnect);
      this.clientId = user.id;
    }
    this.commande_services.getAllCommandeByIClient(this.clientId).subscribe(
      (requests) => {
        this.requests = requests;
        console.log('commande récupérées avec succès:', requests);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'somthing was warrning',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    );
  }
  deleteDemande(id: number) {
    // Swal.fire({
    //   title: 'Supprimer la demande ?',
    //   text: 'Êtes-vous sûr de vouloir supprimer cette cette demande ?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Oui, supprimer',
    //   cancelButtonText: 'Annuler',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.commande_services.deleteChequeBookRequest(id).subscribe(
    //       (res: any) => {
    //         Swal.fire({
    //           icon: 'success',
    //           title: 'la demande a été supprimée avec succès',
    //           showConfirmButton: false,
    //           timer: 1500,
    //           timerProgressBar: true,
    //         });
    //         this.ngOnInit();
    //       },
    //       () => {
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'somthing was warrning',
    //           showConfirmButton: false,
    //           timer: 1500,
    //           timerProgressBar: true,
    //         });
    //       }
    //     );
    //   }
    // });
  }
  canDelete(status: string): boolean {
    return status !== 'APPROVED' && status !== 'REFUSED';
  }
  voirDetails(id: number) {
    this.route.navigate(['/client/voir_Details/', id]);
  }
  updateCommande(id: number) {
    this.route.navigate(['client/update-commande/', id]);
  }
}
