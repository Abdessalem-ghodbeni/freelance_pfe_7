import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  constructor(private http: HttpClient) {}

  AjouterCommande(Commande: any, idClient: number) {
    return this.http
      .post(`${environment.baseUrl}/Commande/add/${idClient}`, Commande)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  AjouterPaiement(payload: any) {
    return this.http
      .post(`${environment.baseUrl}/Paiment/ajouter`, payload)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getByICommannde(idCommande: number) {
    return this.http
      .get<any>(`${environment.baseUrl}/Commande/${idCommande}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getAllCommande() {
    return this.http.get<any[]>(`${environment.baseUrl}/Commande/all`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }

  getAgentProductivityComparison(agentId1: number, agentId2: number) {
    return this.http.get<any[]>(
      `${environment.baseUrl}/Commande/productivity-comparison/${agentId1}/${agentId2}`
    );
  }

  getOggiCommande() {
    return this.http.get<any[]>(`${environment.baseUrl}/Commande/today`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }

  getAllCommandeByIClient(idClient: number) {
    return this.http
      .get<any>(`${environment.baseUrl}/Commande/byClientId/${idClient}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  // updateCommande(commande: any, idclient: number, commandeid: number) {
  //   return this.http
  //     .put<any>(
  //       `${environment.baseUrl}/Commande/update/${commandeid}/${idclient}`,
  //       commande
  //     )
  //     .pipe(
  //       catchError((error) => {
  //         console.log('errrr', error);
  //         throw error;
  //       })
  //     );
  // }

  updateCommande(
    commandeId: number,
    updatedCommande: any,
    clientId: number
  ): Observable<any> {
    const url = `${environment.baseUrl}/Commande/update/${commandeId}/${clientId}`;
    return this.http.put(url, updatedCommande);
  }
}
