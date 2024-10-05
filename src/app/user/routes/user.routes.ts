import { Routes } from '@angular/router';

export default [
  {
    path: 'profile',
    loadComponent: () => import('../pages/profile/profile.page'),
  },
] as Routes;
