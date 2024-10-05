import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CurrentUser } from 'src/app/types/recetas-app';
import { LogOutComponent } from '../../../auth/components/log-out/log-out.component';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    LogOutComponent,
  ],
})
export default class ProfilePage implements OnInit {
  private _storeService = inject(StorageService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  currentUser: CurrentUser | null = null;

  constructor() {}

  async ngOnInit() {
    this.currentUser = await this._storeService.get('currentUser');
  }

  async logOut() {
    const result = await this._authService.logOut();
    if (!result) {
      console.log('Fallo al cerrar sesión');
    }

    this._router.navigateByUrl('/recetas/home');
  }
}
