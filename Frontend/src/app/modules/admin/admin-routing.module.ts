import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';

import { StatistiquesComponent } from './views/statistiques/statistiques.component';

import { AjouterArticleComponent } from './views/ajouter-article/ajouter-article.component';
import { ListeArticlesComponent } from './views/liste-articles/liste-articles.component';
import { AjouterClientComponent } from './views/ajouter-client/ajouter-client.component';
import { ListeClientComponent } from './views/liste-client/liste-client.component';

import { MenuSettingsComponent } from './views/menu-settings/menu-settings.component';
import { ListDesCommandesComponent } from './views/list-des-commandes/list-des-commandes.component';
import { HistoriqueCommandeTotaleComponent } from './views/historique-commande-totale/historique-commande-totale.component';
import { ListeFacturesComponent } from './views/liste-factures/liste-factures.component';
import { ListeCategoriesComponent } from './views/liste-categories/liste-categories.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'menu-settings', component: MenuSettingsComponent },

      { path: 'list-client', component: ListeClientComponent },
      { path: 'ajouter-article', component: AjouterArticleComponent },
      { path: 'statistique', component: StatistiquesComponent },
      { path: 'list-articles', component: ListeArticlesComponent },
      { path: 'list-categories', component: ListeCategoriesComponent },
      { path: 'list-factures', component: ListeFacturesComponent },
      { path: 'ajouter-client', component: AjouterClientComponent },
      {
        path: 'historique-commande',
        component: HistoriqueCommandeTotaleComponent,
      },
      { path: 'Commande/:id', component: ListDesCommandesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class AdminRoutingModule {}
