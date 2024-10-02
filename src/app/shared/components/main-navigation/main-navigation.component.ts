import { Component, OnInit } from '@angular/core';
import { IonTabBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  standalone: true,
  imports: [IonTabBar],
})
export class MainNavigationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  mainNavigationRoutes = [
    {
      path: '/pages/home',
      name: 'Inicio',
      icon: 'home-outline',
    },
    {
      path: '/recetas/categories',
      name: 'Catergorias',
      icon: 'albums-outline',
    },
    {
      path: '/recetas/search',
      name: 'Buscar',
      icon: 'search',
    },
    {
      path: '/user/profile',
      name: 'Mi Perfil',
      icon: 'person',
    },
  ];
}
