import { CatalogueDescriptionComponent } from './catalogue-description/catalogue-description.component';
import { CatalogueDetailsComponent } from './catalogue-details/catalogue-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormContactComponent } from './form-contact/form-contact.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CatalogueDescriptionComponent,
    CatalogueDetailsComponent,
    FormContactComponent,
    CatalogueComponent,
    AboutUsComponent,
    NavbarComponent,
    HomeComponent,
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    BrowserModule,
    RoutingModule,
    MatListModule,
    MatIconModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
