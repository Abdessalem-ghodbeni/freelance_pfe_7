import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAllArticles() {
    return this.http.get<any[]>(`${environment.baseUrl}/article/all`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }
  getArticleQuantite(articleId: number): Observable<number> {
    return this.http
      .get<number>(`${environment.baseUrl}/article/get-quantity/${articleId}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getAllTop10Articles() {
    return this.http.get<any[]>(`${environment.baseUrl}/article/top10`).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }
  getAllNonVendueArticles() {
    return this.http
      .get<any[]>(`${environment.baseUrl}/article/count-unsold`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getAllVendueArticles() {
    return this.http
      .get<any[]>(`${environment.baseUrl}/article/sold-count`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  getByIArticle(idAryticle: number) {
    return this.http
      .get<any>(`${environment.baseUrl}/article/GetById/${idAryticle}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }
  deleteArticle(id: number) {
    return this.http
      .delete(`${environment.baseUrl}/article/supprimer/${id}`)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }

  Ajouterarticle(article: any) {
    return this.http.post(`${environment.baseUrl}/article/add`, article).pipe(
      catchError((error) => {
        console.log('errrr', error);
        throw error;
      })
    );
  }

  updatearticle(article: any) {
    return this.http
      .put<any>(`${environment.baseUrl}/article/update`, article)
      .pipe(
        catchError((error) => {
          console.log('errrr', error);
          throw error;
        })
      );
  }
}
