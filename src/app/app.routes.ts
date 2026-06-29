import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    title: 'Home | ALX Garden',
    data: {
      description:
        'Discover premium flower varieties from ALX Garden, including roses, gypsophila, hypericum and sunflowers.',
      image: '/assets/carrousel-1.jpg'
    },
    loadComponent: () =>
      import('@features/home/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      )
  },
  {
    path: 'about-us',
    title: 'About Us | ALX Garden',
    data: {
      description:
        'Learn more about ALX Garden, our flower varieties and how to get in touch with our team.',
      image: '/assets/2.jpg'
    },
    loadComponent: () =>
      import('@features/about/pages/about-page/about-page.component').then(
        (m) => m.AboutPageComponent
      )
  },
  {
    path: 'gallery',
    title: 'Products | ALX Garden',
    data: {
      description:
        'Browse the ALX Garden flower catalogue with detailed product pages and variety information.',
      image: '/assets/catalogue/roses.jpg'
    },
    loadChildren: () =>
      import('@app/features/catalogue/routes/catalogue.routes').then((m) => m.CATALOGUE_ROUTES)
  },
  {
    path: 'not-found',
    title: 'Page Not Found | ALX Garden',
    data: {
      description: 'The requested ALX Garden page could not be found.',
      image: '/assets/logo.jpg',
      robots: 'noindex, nofollow'
    },
    loadComponent: () =>
      import('@features/not-found/pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      )
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
