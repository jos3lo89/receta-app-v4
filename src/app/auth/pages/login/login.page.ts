import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  IonSpinner,
} from '@ionic/angular/standalone';
import { SigninWithGoogleComponent } from '../../components/signin-with-google/signin-with-google.component';
import { AuthService } from '../../service/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

interface FormLogin {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
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
    ReactiveFormsModule,
  ],
})
export default class LoginPage implements OnInit {
  private _authService = inject(AuthService);
  private _storeService = inject(StorageService);
  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);
  private _toast = inject(ToastService);

  isloadingSubmitBtn = false;
  isLoadingGoogleBtn = false;

  form = this._formBuilder.group<FormLogin>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [Validators.required]),
  });

  constructor() {}

  ngOnInit() {}

  async login() {
    try {
      this.isLoadingGoogleBtn = true;

      const user = await this._authService.signInWithGoogle();

      await this._storeService.set('currentUser', user);

      this._toast.getToast('Vienvenido de nuevo', 'middle', 'success');

      this._router.navigateByUrl('/recetas/home');

      this.isLoadingGoogleBtn = false;
    } catch (error) {
      console.log(error);
      this._toast.getToast('Error al iniciar sesión', 'middle', 'danger');

      this.isLoadingGoogleBtn = false;
    }
  }

  async loginEmailAndPassword() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    if (!email || !password) return;

    try {
      this.isloadingSubmitBtn = true;

      const user = await this._authService.loginService({ email, password });

      this._storeService.set('currentUser', user);

      this.isloadingSubmitBtn = false;
      this.form.reset();

      this._toast.getToast('Vienvenido de nuevo', 'middle', 'success');
      this._router.navigateByUrl('/recetas/home');
    } catch (error) {
      this._toast.getToast('Error al iniciar sesión', 'middle', 'danger');
      this.isloadingSubmitBtn = false;
      console.log(error);
    }
  }
}
