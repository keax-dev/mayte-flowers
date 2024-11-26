import { CatalogueDescriptionComponent } from './catalogue-description/catalogue-description.component';
import { CatalogueDetailsComponent } from './catalogue-details/catalogue-details.component';
import { Routes, RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
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
