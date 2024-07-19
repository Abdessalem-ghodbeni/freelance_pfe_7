import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CategorieService } from 'src/app/core/services/Ctergorie/categorie.service';
import { ArticleService } from 'src/app/core/services/Article/article.service';
@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.css'],
})
export class AjouterArticleComponent implements OnInit {
  listCategorie!: any[];
  showQuantityInput: boolean = false;
  AjouterArticleForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.required,
    ]),
    prix: new FormControl('', [Validators.required]),
    iamge: new FormControl(''),
    categorieId: new FormControl('', [Validators.required]),
    quantityStock: new FormControl(''), // Add quantityStock form control
  });

  toggleQuantityInput(event: any) {
    this.showQuantityInput = event.target.checked;
    if (!this.showQuantityInput) {
      this.AjouterArticleForm.get('quantityStock')?.setValue('');
    }
  }

  constructor(
    private categorie: CategorieService,
    private _router: Router,
    private article_service: ArticleService
  ) {}
  ngOnInit(): void {
    this.categorie.getCategorie().subscribe({
      next: (data: any) => {
        this.listCategorie = data;
      },
      error: () => {},
    });
  }

  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  ajouterArticle() {
    const formData = new FormData();

    const addValueToFormData = (key: string, value: any) => {
      if (value != null) {
        formData.append(key, value);
      }
    };

    addValueToFormData('nom', this.AjouterArticleForm.get('nom')?.value);
    addValueToFormData('prix', this.AjouterArticleForm.get('prix')?.value);
    addValueToFormData(
      'description',
      this.AjouterArticleForm.get('description')?.value
    );
    addValueToFormData(
      'categorieId',
      this.AjouterArticleForm.get('categorieId')?.value
    );

    if (this.showQuantityInput) {
      addValueToFormData(
        'quantityStock',
        this.AjouterArticleForm.get('quantityStock')?.value
      );
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.article_service.Ajouterarticle(formData).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'operation  réussie',
          text: 'Vous pouvez voir la liste des article',
          showConfirmButton: false,
          timer: 1500,
        });
        this._router.navigate(['admin/list-articles']);
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Une erreur est survenue lors de l'ajout du article",
          footer: 'Veuillez réessayer',
        });
      }
    );
  }
}
