import { Routes } from '@angular/router';

export default [
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home.page'),
  },
  {
    path: "region",
    loadComponent: () => import("../pages/regiones/regiones.page")
  }
] as Routes;
