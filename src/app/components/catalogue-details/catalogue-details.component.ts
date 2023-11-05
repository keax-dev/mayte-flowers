import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalogue-details',
  templateUrl: './catalogue-details.component.html',
  styleUrls: ['./catalogue-details.component.css']
})
export class CatalogueDetailsComponent implements OnInit {

  data!: any[];
  category: any = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    switch (this.category) {
      case 'roses':
        this.data = [{ "name": "EXPLORER ROSE", "url": "/assets/roses/explorer.jpg" }, { "name": "CHECKMATE ROSE", "url": "/assets/roses/Checkmate-macro.jpg" }, { "name": "FREEDOM ROSE", "url": "/assets/roses/FREEDOM.jpg" }, { "name": "IGUANA ROSE", "url": "/assets/roses/Iguana_Bicolor_Single_X-1.jpg" }, { "name": "HIGH MAGIC ROSE", "url": "/assets/roses/High-Magic-B.jpg" }, { "name": "HIGH ORANGE MAGIC ROSE", "url": "/assets/roses/High-Orange-Magic-B.jpg" }, { "name": "PINKFLOYD ROSE", "url": "/assets/roses/pinkfloyd-rose-skyroses.jpg" }, { "name": "GOTCHA ROSE", "url": "/assets/roses/Gotcha-B.jpg" }, { "name": "TOPAZ ROSE", "url": "/assets/roses/topaz_top.png" }, { "name": "HERMOSA ROSE", "url": "/assets/roses/Hermosa_Aerial_View.jpg" }, { "name": "MANDALA ROSE", "url": "/assets/roses/mandala-abierto.jpg" }, { "name": "PINK MONDIAL ROSE", "url": "/assets/roses/Pink-Mondial-B.jpg" }, { "name": "SAHARA ROSE", "url": "/assets/roses/rose-cream-sahara-3.jpg" }, { "name": "BRIGHTON ROSE", "url": "/assets/roses/Brighton.png" }, { "name": "TARA ROSE", "url": "/assets/roses/Tara-B.jpg" }, { "name": "TIBET ROSE", "url": "/assets/roses/Tibet_White_SingleSt_X.jpg" }, { "name": "MONDIAL ROSE", "url": "/assets/roses/mondial.jpg" }, { "name": "VENDELA ROSE", "url": "/assets/roses/vendela.jpg" }];
        break;
      case 'gypsophila':
        this.data = [
          { name: "RAINBOW", url: "/assets/gypsophila/RAINBOW.jpg" },
          { name: "XCELLENT", url: "/assets/gypsophila/XCELLENT.jpg" },
          { name: "DARK PINK ", url: "/assets/gypsophila/DARK_PINK.jpg" },
          { name: "PURPLE", url: "/assets/gypsophila/PURPLE.jpg" },
          { name: "BLUE", url: "/assets/gypsophila/BLUE.jpg" },
          { name: "YELLOW", url: "/assets/gypsophila/YELOW.jpg" },
          { name: "RED", url: "/assets/gypsophila/RED.jpg" },
          { name: "GREEN", url: "/assets/gypsophila/GREEN.jpg" }
        ];
        break;
      default:
        break;
    }
  }

  redirect(name: string) {
    const url = '/gallery/' + this.category + '/' + name.replace(/ /g, '_').toLowerCase();
    this.router.navigateByUrl(url);
  }

}
