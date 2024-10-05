import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  UserCredential,
  createUserWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CurrentUser } from 'src/app/types/recetas-app';

export interface UserRegisterI {
  nombre: string;
  apellido: string;
  rol: 'user' | 'admin';
  email: string;
  password: string;
}

export interface userDocDataI {
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);
  private _storage = inject(StorageService);

  userCap: User | null = null;
  userGoogle: UserCredential | null = null;

  constructor() {
    this.init();
  }

  async signInWithGoogle() {
    this.userCap = await GoogleAuth.signIn();

    const _credential = GoogleAuthProvider.credential(
      this.userCap.authentication.idToken
    );

    this.userGoogle = await signInWithCredential(this._auth, _credential);

    const setData: CurrentUser = {
      nombre: this.userCap.givenName,
      apellido: this.userCap.familyName,
      email: this.userCap.email,
      foto: this.userCap.imageUrl,
      rol: 'user',
      token: this.userCap.authentication.accessToken,
    };

    return setData;
  }

  async registerService(user: UserRegisterI) {
    try {
      const newUser = await createUserWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );

      const userRef = doc(this._firestore, `users/${newUser.user.uid}`);
      await setDoc(userRef, {
        email: newUser.user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
      });

      return newUser;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async loginService(user: Omit<UserRegisterI, 'nombre' | 'apellido' | 'rol'>) {
    this.userGoogle = await signInWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );

    const userDocRef = doc(
      this._firestore,
      `users/${this.userGoogle.user.uid}`
    );

    const userDocData = await getDoc(userDocRef);

    const data = userDocData.data() as userDocDataI;

    const setData: CurrentUser = {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      foto: this.userGoogle.user.photoURL
        ? this.userGoogle.user.photoURL
        : 'https://firebasestorage.googleapis.com/v0/b/receta-app-v4.appspot.com/o/userPhoyo.webp?alt=media&token=bc5e9429-6f53-494c-8d01-443430891048',
      rol: data.rol,
      token: this.userGoogle.user.uid,
    };

    return setData;
  }

  async logOut() {
    try {
      await this._auth.signOut();
      await this._storage.remove('currentUser');
      return true;
    } catch (error) {
      return false;
    }
  }

  init() {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }
}
