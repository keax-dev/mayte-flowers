import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  next:any;

  set_time: any;

  data: any[] = [
    { url: '/assets/carrusel/1.jpg' },
    { url: '/assets/carrusel/2.jpg' },
    { url: '/assets/carrusel/3.jpg' },
    { url: '/assets/carrusel/4.jpg' },
    { url: '/assets/carrusel/5.jpg' },
    { url: '/assets/carrusel/6.jpg' }
  ];

  ngAfterViewInit(): void {
    this.next = document.getElementById('next');
    this.click__();
  }

  click__() {
    clearInterval(this.set_time);
    this.set_time = setInterval(() => this.next.click(), 2500);
  }

}
