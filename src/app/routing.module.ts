import { CatalogueDescriptionComponent } from './components/catalogue-description/catalogue-description.component';
import { CatalogueDetailsComponent } from './components/catalogue-details/catalogue-details.component';
import { Routes, RouterModule } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'home', component: HomeComponent },
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
