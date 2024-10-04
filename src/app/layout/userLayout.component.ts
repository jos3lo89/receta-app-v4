import { Component } from "@angular/core";
import {IonHeader, IonFooter, IonContent, IonRouterOutlet} from "@ionic/angular/standalone"


@Component({
  imports: [IonHeader, IonFooter, IonContent, IonRouterOutlet],
  standalone: true,
  template: `

  <ion-header>

  </ion-header>

  <ion-content>
<ion-router-outlet />
  </ion-content>

  <ion-footer>


  </ion-footer>

  `,
  styles: ``
})

export default class UserLayoutComponent {}
