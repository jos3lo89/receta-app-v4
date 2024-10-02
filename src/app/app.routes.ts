import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'recetas',
    loadChildren: () => import('./recetas/routes/recetas.routes'),
  },
  {
    path: 'auth',
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
