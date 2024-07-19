import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/core/services/Article/article.service';
import { CategorieService } from 'src/app/core/services/Ctergorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-articles',
  templateUrl: './liste-articles.component.html',
  styleUrls: ['./liste-articles.component.css'],
})
export class ListeArticlesComponent {
  listAgents: any[] = [];
  myrticle!: any;
  selectedIdAgent!: number;
  listCategorie!: any[];
  selectedAgenceId: number | null = null;
  UniversiteForm!: FormGroup;
  rechercherArticles: string = '';
  image!: string;
  listeArticles!: any[];
  imageUrl!: string;
  constructor(
    private articles_services: ArticleService,
    private _router: Router,
    private categorie: CategorieService
  ) {}
  ngOnInit() {
    this.articles_services.getAllArticles().subscribe({
      next: (data: any) => {
        this.listeArticles = data;
        console.log('ee', this.listeArticles);
      },
      error: () => {},
    });

    this.categorie.getCategorie().subscribe({
      next: (data: any) => {
        this.listCategorie = data;
      },
      error: () => {},
    });
  }
  // getImageUrl(imageName: string): string {
  //   return `http://localhost:8089/Restaurant/uploadUser/${imageName}`;
  // }
  deleteArticle(id: number) {
    Swal.fire({
      title: "Supprimer l'article ?",
      text: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.articles_services.deleteArticle(id).subscribe(
          (res: any) => {
            Swal.fire({
              icon: 'success',
              title: "L'article a été supprimée avec succès",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.ngOnInit();
          },
          (error) => {
            Swal.fire({
              icon: 'success',
              title: "L'article a été supprimée avec succès",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        );
      }
    });
  }

  getByid(id: number) {
    this.articles_services.getByIArticle(id).subscribe({
      next: (data: any) => {
        this.myrticle = data;
        this.image = data.image;

        this.ModifierArticleForm.patchValue({
          id: data.id,
          nom: data.nom,
          description: data.description,
          prix: data.prix,
          categorieId: data.categorieId,
        });
        // this.selectedFile = data.image;
        this.imageUrl = data.image;
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  getImageUrl(image: string): string {
    const baseUrl = 'http://localhost:8089/Restaurant/article';
    return `${baseUrl}/${image}`;
  }

  selectedFile: File | null = null;

  ModifierArticleForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    prix: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    categorieId: new FormControl('', [Validators.required]),
  });

  modifierArticle() {
    const formData = new FormData();
    const addValueToFormData = (key: string, value: any) => {
      if (value != null) {
        formData.append(key, value);
      }
    };

    addValueToFormData('nom', this.ModifierArticleForm.get('nom')?.value);
    addValueToFormData('id', this.ModifierArticleForm.get('id')?.value);
    addValueToFormData('prix', this.ModifierArticleForm.get('prix')?.value);
    addValueToFormData(
      'description',
      this.ModifierArticleForm.get('description')?.value
    );
    addValueToFormData(
      'categorieId',
      this.ModifierArticleForm.get('categorieId')?.value
    );

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.articles_services.updatearticle(formData).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Opération réussie',
          text: 'Article mis à jour avec succès',
          showConfirmButton: false,
          timer: 1500,
        });
        this._router.navigate(['admin/list-articles']);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Une erreur est survenue lors de la mise à jour de l'article",
          footer: 'Veuillez réessayer',
        });
      }
    );
  }
}
