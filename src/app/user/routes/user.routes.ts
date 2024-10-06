import { Routes } from '@angular/router';
import { RoleGaurd, RoleGaurd2 } from '../guard/role.guard';

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
    canActivate: [RoleGaurd2()],
    path: 'receta/agregar-receta',
    loadComponent: () => import('../pages/agregar-receta/agregar-receta.page'),
  },
] as Routes;
