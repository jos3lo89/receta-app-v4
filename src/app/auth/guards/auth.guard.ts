import { inject, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CurrentUser } from 'src/app/types/recetas-app';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private _storage = inject(StorageService);
  private _router = inject(Router);

  async canActivate() {
    await this._storage.init();
    const currentUser: CurrentUser = await this._storage.get('currentUser');

    if (currentUser) {
      return true;
    } else {
      this._router.navigateByUrl('/auth/login');
      return false;
    }
  }
}
