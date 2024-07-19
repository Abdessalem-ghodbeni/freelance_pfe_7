import { Component, OnInit, OnDestroy } from '@angular/core';
import { FactureService } from 'src/app/core/services/Facture/facture.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-liste-factures',
  templateUrl: './liste-factures.component.html',
  styleUrls: ['./liste-factures.component.css'],
})
export class ListeFacturesComponent implements OnInit, OnDestroy {
  ListeFacture: any[] = [];
  private subscription!: Subscription;

  constructor(private facture_service: FactureService) {}

  ngOnInit(): void {
    this.getAllFactures();
    this.subscription = this.facture_service.facturesObservable$.subscribe(
      (factures) => {
        this.ListeFacture = factures;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllFactures() {
    this.facture_service.getAllFacture().subscribe({
      next: (data: any) => {
        this.facture_service.updateFacturesList(data);
      },
      error: () => {},
    });
  }

  deleteArticle(id: number, index: number) {
    Swal.fire({
      title: 'Supprimer la facture ?',
      text: 'Êtes-vous sûr de vouloir supprimer cette facture ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer l'élément de la liste locale
        this.ListeFacture.splice(index, 1);
        this.facture_service.updateFacturesList(this.ListeFacture);

        this.facture_service.deleteFacture(id).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'La facture a été supprimée avec succès',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          },
          (error) => {
            // Réinsérer l'élément dans la liste locale en cas d'échec
            this.ListeFacture.splice(index, 0, id);
            this.facture_service.updateFacturesList(this.ListeFacture);

            Swal.fire({
              icon: 'success',
              title: 'La facture a été supprimée avec succès',
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
