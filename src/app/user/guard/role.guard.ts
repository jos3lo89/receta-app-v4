import { inject, Injectable } from '@angular/core';
import { CanActivateChild, CanActivateFn, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CurrentUser } from 'src/app/types/recetas-app';
@Injectable({
  providedIn: 'root',
})
export class RoleGaurd implements CanActivateChild {
  private _storage = inject(StorageService);
  private _router = inject(Router);

  async canActivateChild() {
    await this._storage.init();
    const currentUser: CurrentUser = await this._storage.get('currentUser');

    console.log('role guard --->', currentUser);

    if (currentUser.rol === 'admin') {
      return true;
    } else {
      this._router.navigateByUrl('/auth/login');
      return false;
    }
  }
}

export const RoleGaurd2 = (): CanActivateFn => {
  return async () => {
    const storage = inject(StorageService);
    const router = inject(Router);

    const currentUser: CurrentUser = await storage.get('currentUser');

    if (currentUser.rol === 'admin') {
      return true;
    } else {
      router.navigateByUrl('/user/profile');
      return false;
    }
  };
};
