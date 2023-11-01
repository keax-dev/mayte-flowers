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
        this.data = ['explorer.jpg', 'Checkmate-macro.jpg', 'FREEDOM.jpg', 'Iguana_Bicolor_Single_X-1.jpg', 'High-Magic-B.jpg', 'High-Orange-Magic-B.jpg', 'pinkfloyd-rose-skyroses.jpg', 'Gotcha-B.jpg', 'topaz_top.png', 'Hermosa_Aerial_View.jpg', 'mandala-abierto.jpg', 'Pink-Mondial-B.jpg', 'rose-cream-sahara-3.jpg', 'Brighton.png', 'Tara-B.jpg', 'Tibet_White_SingleSt_X.jpg', 'mondial.jpg', 'vendela.jpg'].map((imageName): any => ({
          name: imageName.replace(/[-_]/g, ' ').replace(/\.(png|jpg)/, '').toUpperCase(),
          url: `/assets/roses/${imageName}`,
        }));
        break;

      default:
        break;
    }
  }

}
