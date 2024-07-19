import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-voir-details',
  templateUrl: './voir-details.component.html',
  styleUrls: ['./voir-details.component.css'],
})
export class VoirDetailsComponent {
  demande: any;
  id!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }
}
