import { Component } from '@angular/core';
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonContent,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { MainNavigationComponent } from '../shared/components/main-navigation/main-navigation.component';
import { MainHeaderComponent } from '../shared/components/main-header/main-header.component';

@Component({
  standalone: true,
  imports: [
    IonFooter,
    IonHeader,
    IonContent,
    IonToolbar,
    IonRouterOutlet,
    MainNavigationComponent,
    MainHeaderComponent,
  ],
  template: `
    <ion-header>
      <app-main-header />
    </ion-header>

    <ion-content>
      <ion-router-outlet />
    </ion-content>

    <ion-footer>
      <!-- <ion-toolbar> -->
        <app-main-navigation />
      <!-- </ion-toolbar> -->
    </ion-footer>
  `,
  styles: ``,
})
export default class LayoutComponent {}
