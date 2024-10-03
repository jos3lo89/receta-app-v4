import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonInput,
  IonItem,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { SigninWithGoogleComponent } from '../../components/signin-with-google/signin-with-google.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCardContent,
    IonList,
    IonCardTitle,
    IonCardHeader,
    IonItem,
    IonInput,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SigninWithGoogleComponent,
  ],
})
export default class LoginPage implements OnInit {
  private _authService = inject(AuthService);

  constructor() {}

  ngOnInit() {}

  async login() {
    try {
      const user = await this._authService.signInWithGoogle();

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
}
