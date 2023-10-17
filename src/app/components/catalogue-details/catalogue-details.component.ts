import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogue-details',
  templateUrl: './catalogue-details.component.html',
  styleUrls: ['./catalogue-details.component.css']
})
export class CatalogueDetailsComponent implements OnInit {

  data!: any[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    switch (this.route.snapshot.params['id']) {
      case 'roses':
        this.data = [
          'Brighton.png',
          'High-Magic-B.jpg',
          'Tibet_White_SingleSt_X.jpg',
          'rose-cream-sahara-3.jpg',
          'Checkmate-macro.jpg',
          'High-Orange-Magic-B.jpg',
          'explorer.jpg',
          'topaz_top.png',
          'FREEDOM.jpg',
          'Iguana_Bicolor_Single_X-1.jpg',
          'mandala-abierto.jpg',
          'vendela.jpg',
          'Gotcha-B.jpg',
          'Pink-Mondial-B.jpg',
          'mondial.jpg',
          'Hermosa_Aerial_View.jpg',
          'Tara-B.jpg',
          'pinkfloyd-rose-skyroses.jpg',
        ].map((imageName): any => ({
          name: imageName.replace(/[-_]/g, ' ').replace(/\.(png|jpg)/, '').toUpperCase(),
          url: `/assets/roses/${imageName}`,
        }));
        break;

      default:
        break;
    }
  }

}
