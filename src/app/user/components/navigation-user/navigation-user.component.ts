import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logInOutline, personAddOutline, personOutline } from 'ionicons/icons';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CurrentUser } from 'src/app/types/recetas-app';

@Component({
  selector: 'app-navigation-user',
  templateUrl: './navigation-user.component.html',
  styleUrls: ['./navigation-user.component.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar, RouterLink],
})
export class NavigationUserComponent implements OnInit {
  private _storeService = inject(StorageService);

  currentUser: CurrentUser | null = null;

  navigationRoutes = [
    {
      path: '/user/receta/agregar-receta',
      name: 'Agregar Receta',
      icon: 'log-in-outline',
      soloAdmin: true,
    },
    {
      path: '/user/favorities',
      name: 'Favoritos',
      icon: 'person-add-outline',
      soloAdmin: false,
    },
    {
      path: '/user/profile',
      name: 'Mi perfil',
      icon: 'person-outline',
      soloAdmin: false,
    },
  ];

  constructor() {
    addIcons({ logInOutline, personAddOutline, personOutline });
  }

  async ngOnInit() {
    this.currentUser = await this._storeService.get('currentUser');

    if (this.currentUser?.rol !== 'admin') {
      this.navigationRoutes = this.navigationRoutes.filter(
        (ruta) => !ruta.soloAdmin
      );
    }
  }
}
