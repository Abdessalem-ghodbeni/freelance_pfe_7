import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { RechercheEtudiantPipe } from 'src/app/core/pipes/Etudiant/recherche-etudiant.pipe';
import { RechercheUniversitePipe } from 'src/app/core/pipes/Universite/recherche-universite.pipe';

import { StatistiquesComponent } from './views/statistiques/statistiques.component';
import { StatistiqueCompteAgenceComponent } from './views/statistique-compte-agence/statistique-compte-agence.component';

import { AjouterArticleComponent } from './views/ajouter-article/ajouter-article.component';
import { ListeArticlesComponent } from './views/liste-articles/liste-articles.component';
import { AjouterClientComponent } from './views/ajouter-client/ajouter-client.component';
import { ListeClientComponent } from './views/liste-client/liste-client.component';
import { StatistiqueCommandeOggiComponent } from './views/statistique-commande-oggi/statistique-commande-oggi.component';
import { AjouterCategorieComponent } from './views/ajouter-categorie/ajouter-categorie.component';
import { MenuSettingsComponent } from './views/menu-settings/menu-settings.component';
import { ListDesCommandesComponent } from './views/list-des-commandes/list-des-commandes.component';
import { HistoriqueCommandeTotaleComponent } from './views/historique-commande-totale/historique-commande-totale.component';
import { ListeFacturesComponent } from './views/liste-factures/liste-factures.component';
import { ListeCategoriesComponent } from './views/liste-categories/liste-categories.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,

    RechercheEtudiantPipe,
    RechercheUniversitePipe,

    StatistiquesComponent,
    StatistiqueCompteAgenceComponent,

    AjouterArticleComponent,
    ListeArticlesComponent,
    AjouterClientComponent,
    ListeClientComponent,
    StatistiqueCommandeOggiComponent,
    AjouterCategorieComponent,
    MenuSettingsComponent,
    ListDesCommandesComponent,
    HistoriqueCommandeTotaleComponent,
    ListeFacturesComponent,
    ListeCategoriesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
