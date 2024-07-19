import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ClientProfileComponent } from './views/client-profile/client-profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VoirDetailsComponent } from './views/voir-details/voir-details.component';
import { PasserCommandeComponent } from './views/passer-commande/passer-commande.component';
import { DetailsCommandeAPayerComponent } from './views/details-commande-a-payer/details-commande-a-payer.component';
import { ListeCommandeParClientComponent } from './views/liste-commande-par-client/liste-commande-par-client.component';
import { CommandePipe } from 'src/app/core/pipes/commande/commande.pipe';
import { FactureTicketComponent } from './views/facture-ticket/facture-ticket.component';
import { UpdateCommandeComponent } from './views/update-commande/update-commande.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ClientProfileComponent,

    CommandePipe,

    VoirDetailsComponent,
    PasserCommandeComponent,
    DetailsCommandeAPayerComponent,
    ListeCommandeParClientComponent,
    FactureTicketComponent,
    UpdateCommandeComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule {}
