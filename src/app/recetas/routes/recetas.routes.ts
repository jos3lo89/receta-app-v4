import { Routes } from '@angular/router';

export default [
  {
    path: 'home',
    loadComponent: () => import('../pages/home/home.page'),
  },
  {
    path: 'region',
    loadComponent: () => import('../pages/regiones/regiones.page'),
  },
  {
    path: 'detalles',
    loadComponent: () => import('../pages/detalles/detalles.page'),
  },
  {
    path: 'categorias',
    loadComponent: () => import('../pages/categorias/categorias.page'),
  },
  {
    path: 'busqueda',
    loadComponent: () => import('../pages/busqueda/busqueda.page'),
  },
] as Routes;
