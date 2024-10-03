import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'recetas',
    loadComponent: () => import('./layout/layout.component'),
    loadChildren: () => import('./recetas/routes/recetas.routes'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./layout/authLayout.component'),
    loadChildren: () => import('./auth/routes/auth.routes'),
  },
  {
    path: '',
    redirectTo: 'recetas/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'recetas/home',
    pathMatch: 'full',
  },
];
