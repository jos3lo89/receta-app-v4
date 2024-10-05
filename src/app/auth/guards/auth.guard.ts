import { inject, Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  CanActivateFn,
} from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CurrentUser } from 'src/app/types/recetas-app';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard2 implements CanActivateChild {
  private _storage = inject(StorageService);
  private _router = inject(Router);

  async canActivateChild() {
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

export const authGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.authState$.pipe(
      map((state) => {
        if (!state) {
          router.navigateByUrl('/auth/login');
          return false;
        }

        return true;
      })
    );
  };
};
