import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from '@angular/fire/auth';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _storage = inject(StorageService);

  user: UserCredential | null = null;

  constructor() {}

  async signInWithGoogle() {
    const googleProvider = new GoogleAuthProvider().setCustomParameters({
      prompt: 'select_account',
    });

    this.user = await signInWithPopup(this._auth, googleProvider);

    await this._storage.set('currentUser', "wdafa");

    return this.user;
  }

  async getdata() {
    console.log(
      'qwerqwerqwerqwerqw- >>>',
      await this._storage.get('currentUser')
    );
  }
}
