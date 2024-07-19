import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/services/Client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-client',
  templateUrl: './liste-client.component.html',
  styleUrls: ['./liste-client.component.css'],
})
export class ListeClientComponent implements OnInit {
  listeClients!: any[];
  constructor(
    private client_services: ClientService,
    private _router: Router
  ) {}
  getImageUrl(image: string): string {
    const baseUrl = 'http://localhost:8089/Restaurant/client';
    return `${baseUrl}/${image}`;
  }
  ngOnInit(): void {
    this.client_services.getClient().subscribe({
      next: (data: any) => {
        this.listeClients = data;
        console.log('CCCC', this.listeClients);
      },
      error: () => {},
    });
  }
  viewClientDetails(id: number): void {
    this._router.navigate(['/admin/Commande', id]);
  }

  deleteClient(id: number) {
    Swal.fire({
      title: 'Supprimer ce client ?',
      text: 'Êtes-vous sûr de vouloir supprimer cet client ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.client_services.deleteClient(id).subscribe(
          (res: any) => {
            this.ngOnInit();
            Swal.fire({
              icon: 'success',
              title: 'Le client a été supprimée avec succès',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.ngOnInit();
          },
          (error) => {
            Swal.fire({
              icon: 'success',
              title: 'Le client a été supprimée avec succès',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        );
      }
    });
  }
}
