import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PasserCommandeComponent } from './views/passer-commande/passer-commande.component';
import { DetailsCommandeAPayerComponent } from './views/details-commande-a-payer/details-commande-a-payer.component';
import { ListeCommandeParClientComponent } from './views/liste-commande-par-client/liste-commande-par-client.component';
import { FactureTicketComponent } from './views/facture-ticket/facture-ticket.component';
import { UpdateCommandeComponent } from './views/update-commande/update-commande.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Liste_commande_by_client',
        component: ListeCommandeParClientComponent,
      },
      {
        path: 'facture/:id',
        component: FactureTicketComponent,
      },

      {
        path: 'update-commande/:id',
        component: UpdateCommandeComponent,
      },

      { path: 'passer-commande', component: PasserCommandeComponent },
      {
        path: 'details-commande-aPaye/:id',
        component: DetailsCommandeAPayerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
