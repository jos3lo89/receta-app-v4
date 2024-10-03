import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, map } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';

export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const storageService = inject(StorageService);

    return from(storageService.get('currentUser')).pipe(
      map((token) => {
        if (!token) {
          router.navigateByUrl('/auth/login');
          return false;
        }
        return true;
      })
    );
  };
};

export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const storageService = inject(StorageService);

    return from(storageService.get('currentUser')).pipe(
      map((token) => {
        if (token) {
          router.navigateByUrl('/pages/home');
          return false;
        }
        return true;
      })
    );
  };
};
