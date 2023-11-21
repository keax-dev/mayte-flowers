import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  categories: any[] = [
    { name: 'ROSES', url: '/assets/catalogue/roses.jpg' },
    { name: 'HYMPERICU', url: '/assets/catalogue/hympericu.jpg' },
    { name: 'GYPSOPHILA', url: '/assets/catalogue/gypsophila.jpg' },
    { name: 'SUNFLOWER', url: '/assets/catalogue/sunflower.jpg', op: true }
  ];

  constructor() { }

  ngOnInit() {

  }

}
