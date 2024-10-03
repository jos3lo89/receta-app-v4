import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, albumsOutline, search, person } from 'ionicons/icons';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar],
})
export class MainNavigationComponent implements OnInit {
  private _router = inject(Router);

  constructor() {
    addIcons({ homeOutline, albumsOutline, search, person });
  }

  ngOnInit() {}

  setRouter(route: string) {
    this._router.navigateByUrl(route);
  }

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
