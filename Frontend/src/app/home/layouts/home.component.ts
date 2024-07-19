import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/core/services/Article/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _article_service: ArticleService) {}
  ListeTop10Article!: any[];
  ngOnInit(): void {
    this._article_service.getAllTop10Articles().subscribe({
      next: (data: any) => {
        this.ListeTop10Article = data;
        console.log('ee', this.ListeTop10Article);
      },
      error: () => {},
    });
  }

  getImageUrl(image: string): string {
    const baseUrl = 'http://localhost:8089/Restaurant/article';
    return `${baseUrl}/${image}`;
  }
}
