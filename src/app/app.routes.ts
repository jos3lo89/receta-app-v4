import { Routes } from '@angular/router';
import { authGuard, AuthGuard2 } from './auth/guards/auth.guard';

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
    canActivateChild: [AuthGuard2],
    path: 'user',
    loadComponent: () => import('./layout/userLayout.component'),
    loadChildren: () => import('./user/routes/user.routes'),
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
