import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css'],
})
export class AjouterClientComponent {
  isLoading: boolean = false;
  registerForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cin: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    image: new FormControl('', [Validators.required]),
    numeroTelephone: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateNaissance: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    adresse: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  register() {
    this.isLoading = true;
    const formData = new FormData();

    const addValueToFormData = (key: string, value: any) => {
      if (value != null) {
        formData.append(key, value);
      }
    };

    addValueToFormData('nom', this.registerForm.get('nom')?.value);
    addValueToFormData('adresse', this.registerForm.get('adresse')?.value);
    addValueToFormData('prenom', this.registerForm.get('prenom')?.value);
    addValueToFormData('cin', this.registerForm.get('cin')?.value);
    addValueToFormData(
      'numeroTelephone',
      this.registerForm.get('numeroTelephone')?.value
    );
    addValueToFormData(
      'dateNaissance',
      this.registerForm.get('dateNaissance')?.value
    );
    addValueToFormData('email', this.registerForm.get('email')?.value);
    addValueToFormData('password', this.registerForm.get('password')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.authenticationService.registerClient(formData).subscribe(
      (response: any) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'opération de ajout client  réussie',
          text: 'Vous pouvez voir la liste des client',
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.navigate(['admin/list-client']);
      },
      (error: any) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Une erreur est survenue lors de l'inscription client",
          footer: 'Veuillez réessayer',
        });
      }
    );
  }

  Clear() {
    this.registerForm.reset();
  }
}
