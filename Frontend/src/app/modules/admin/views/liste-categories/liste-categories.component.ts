import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/core/services/Ctergorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styleUrls: ['./liste-categories.component.css'],
})
export class ListeCategoriesComponent implements OnInit {
  listeCategorie: any[] = [];

  constructor(private _categorie_service: CategorieService) {}
  ngOnInit(): void {
    this._categorie_service.getCategorie().subscribe({
      next: (data: any) => {
        this.listeCategorie = data;
      },
      error: () => {},
    });
  }

  deleteCategorie(id: number) {
    Swal.fire({
      title: 'Supprimer la catégorie ?',
      text: 'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this._categorie_service.deleteCategorie(id).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'La catégorie a été supprimée avec succès',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.ngOnInit();
          },
          (error) => {
            Swal.fire({
              icon: 'success',
              title: 'La catégorie a été supprimée avec succès',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        );
      }
    });
  }

  addFormUpdateCategorie = new FormGroup({
    id: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  UpdateCategorie() {
    if (this.addFormUpdateCategorie.valid) {
      this._categorie_service
        .updateCategorie(this.addFormUpdateCategorie.value)
        .subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Opération réussie',
              text: 'Categorie mis à jour avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Une erreur est survenue lors de la mise à jour du catégorie',
              footer: 'Veuillez réessayer',
            });
          }
        );
    }
  }

  getByid(id: number) {
    this._categorie_service.getCategorieById(id).subscribe({
      next: (data: any) => {
        this.addFormUpdateCategorie.patchValue({
          id: data.id,
          nom: data.nom,
          description: data.description,
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'somthing was warrning',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      },
    });
  }
}
