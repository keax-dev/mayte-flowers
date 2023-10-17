import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { CatalogueDetailsComponent } from './components/catalogue-details/catalogue-details.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: CatalogueComponent },
  { path: 'gallery/:id', component: CatalogueDetailsComponent },
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
