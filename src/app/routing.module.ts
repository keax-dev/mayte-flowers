import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { CatalogueDetailsComponent } from './components/catalogue-details/catalogue-details.component';
import { CatalogueDescriptionComponent } from './components/catalogue-description/catalogue-description.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about-us', component: HomeComponent },
  { path: 'gallery', component: CatalogueComponent },
  { path: 'gallery/:id', component: CatalogueDetailsComponent },
  { path: 'gallery/:id/:product', component: CatalogueDescriptionComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
