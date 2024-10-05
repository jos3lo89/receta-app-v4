import { Routes } from '@angular/router';

export default [
  {
    path: 'profile',
    loadComponent: () => import('../pages/profile/profile.page'),
  },
  // {
  //   path: 'agregar-receta',
  //   loadComponent: () =>
  //     import('../../recetas/pages/agregar-receta/agregar-receta.page').then(
  //       (m) => m.AgregarRecetaPage
  //     ),
  // },

  {
    path: 'receta/agregar-receta',
    loadComponent: () => import('../pages/agregar-receta/agregar-receta.page'),
  },
] as Routes;
