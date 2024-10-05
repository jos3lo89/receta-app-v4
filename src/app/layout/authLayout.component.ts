import { Component } from '@angular/core';
import {
  IonRouterOutlet,
  IonHeader,
  IonFooter,
  IonContent,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { NavigationComponent } from '../auth/components/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonBackButton,
    IonHeader,
    IonFooter,
    IonContent,
    IonToolbar,
    NavigationComponent,
    IonButtons,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button>atras</ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-router-outlet />
    </ion-content>

    <ion-footer>
      <app-navigation />
    </ion-footer>
  `,

  styles: ``,
})
export default class AuthLayoutComponent {}
