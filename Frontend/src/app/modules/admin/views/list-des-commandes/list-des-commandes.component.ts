import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/core/services/Client/client.service';

@Component({
  selector: 'app-list-des-commandes',
  templateUrl: './list-des-commandes.component.html',
  styleUrls: ['./list-des-commandes.component.css']
})
export class ListDesCommandesComponent {
  clientId!: number;
  client: any;
  constructor(private route: ActivatedRoute, private clientService: ClientService) { }
  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['id'];
    this.getClientDetails(this.clientId);
  }
  getClientDetails(id: number): void {
    this.clientService.getClientById(id).subscribe(
      (response: any) => {
        this.client = response;
      },
      (error: any) => {
        console.error('Error fetching client data', error);
      }
    );
  }
}
