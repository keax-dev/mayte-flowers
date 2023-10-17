import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  categories: any[] = [
    { name: 'ROSES', url: '/assets/catalogue/roses.jpg' },
    { name: 'HYMPERICUM', url: '' },
    { name: 'CRYSANTEMUS', url: '' }
  ];

  constructor() { }

  ngOnInit() {

  }

}
