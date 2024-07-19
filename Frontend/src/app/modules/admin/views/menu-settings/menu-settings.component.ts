import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/core/services/Ctergorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.css'],
})
export class MenuSettingsComponent implements OnInit {
  listeCategorie: any[] = [];

  constructor(
    private _categorie_service: CategorieService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._categorie_service.getCategorie().subscribe({
      next: (data: any) => {
        this.listeCategorie = data;
      },
      error: () => {},
    });
  }

  addFormcategorie = new FormGroup({
    nom: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  navigateToGeneralSettings() {
    const tabElement = document.querySelector(
      'a[href="#tab-4"]'
    ) as HTMLElement;
    if (tabElement) {
      tabElement.click();
    }
  }
  addcategorie() {
    if (this.addFormcategorie.valid) {
      this._categorie_service
        .AjouterCategorie(this.addFormcategorie.value)
        .subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'operation  réussie',
              text: 'Vous pouvez voir la liste des categorie',
              showConfirmButton: false,
              timer: 1500,
            });
            this._router.navigate(['admin/list-categories']);
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Une erreur est survenue lors de l'ajout du categorie",
              footer: 'Veuillez réessayer',
            });
          }
        );
    }
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
            this.navigateToGeneralSettings();
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
