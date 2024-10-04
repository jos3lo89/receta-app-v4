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
  ],
})
export class ProfilePage implements OnInit {
  private _storeService = inject(StorageService);

  currentUser: CurrentUser | null = null;

  constructor() {}

  async ngOnInit() {
    this.currentUser = await this._storeService.get('currentUser');
    console.log('---->>>>', this.currentUser);
  }
}
