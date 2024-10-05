import { Component } from '@angular/core';
import {
  IonHeader,
  IonFooter,
  IonContent,
  IonRouterOutlet,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { NavigationUserComponent } from '../user/components/navigation-user/navigation-user.component';

@Component({
  imports: [
    IonHeader,
    IonFooter,
    IonContent,
    IonRouterOutlet,
    IonToolbar,
    IonBackButton,
    NavigationUserComponent,
    IonButtons,
  ],
  standalone: true,
  selector: 'app-layout-user',
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
      <app-navigation-user />
    </ion-footer>
  `,
  styles: ``,
})
export default class UserLayoutComponent {}
