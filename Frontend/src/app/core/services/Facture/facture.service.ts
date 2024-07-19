import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  idCommande!: number;

  constructor(private http: HttpClient) {}
  getFactureById(id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrl}/Facture/GetById/${id}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getAllFacture(): Observable<any> {
    return this.http.get<any[]>(`${environment.baseUrl}/Facture/all`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }
  private facturesSubject = new BehaviorSubject<any[]>([]);
  public facturesObservable$ = this.facturesSubject.asObservable();
  updateFacturesList(factures: any[]) {
    this.facturesSubject.next(factures);
  }
  deleteFacture(id: number) {
    return this.http
      .delete(`${environment.baseUrl}/Facture/supprimer/${id}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }
}
