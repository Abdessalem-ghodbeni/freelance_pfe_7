import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  constructor(private http: HttpClient) {}
  getCategorie() {
    return this.http.get<any[]>(`${environment.baseUrl}/Categorie/all`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }
  deleteCategorie(id: number) {
    return this.http
      .delete(`${environment.baseUrl}/Categorie/supprimer/${id}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }
  AjouterCategorie(categorie: any) {
    return this.http
      .post(`${environment.baseUrl}/Categorie/add`, categorie)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getCategorieById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/Categorie/${id}`);
  }

  updateCategorie(categorie: any) {
    return this.http
      .put<any>(`${environment.baseUrl}/Categorie/update`, categorie)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }
}
