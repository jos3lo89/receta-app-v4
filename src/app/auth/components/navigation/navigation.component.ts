import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {logInOutline, personAddOutline} from "ionicons/icons"

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [IonIcon, IonTabButton, IonTabBar,],
})
export class NavigationComponent implements OnInit {


  private _router = inject(Router)

  constructor() {

    addIcons({logInOutline, personAddOutline})
  }

  ngOnInit() {}


  setRoute(route: string) {
    this._router.navigateByUrl(route)
  }


  navigationRoutes = [
    {
      path: '/auth/login',
      name: 'Iniciar sesión',
      icon: 'log-in-outline',
    },
    {
      path: '/auth/register',
      name: 'Registrate',
      icon: 'person-add-outline',
    },
  ];
}
