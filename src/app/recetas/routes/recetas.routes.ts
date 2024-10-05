import { Routes } from '@angular/router';

export default [
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home.page'),
  },
] as Routes;
