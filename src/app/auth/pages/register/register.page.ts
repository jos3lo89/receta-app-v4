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
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonList,
  IonCardContent,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';

interface FormRegister {
  nombre: FormControl<string | null>;
  apellido: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonButton,
    IonCardContent,
    IonList,
    IonInput,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export default class RegisterPage implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toast = inject(ToastService);

  isloadingSubmitBtn = false;

  constructor() {}

  ngOnInit() {}

  form = this._formBuilder.group<FormRegister>({
    nombre: this._formBuilder.control('', [Validators.required]),
    apellido: this._formBuilder.control('', [Validators.required]),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', [Validators.required]),
  });

  async registrar() {
    if (this.form.invalid) return;
    const { nombre, apellido, email, password } = this.form.value;
    if (!nombre || !apellido || !email || !password) return;

    try {
      this.isloadingSubmitBtn = true;
      const newUser = await this._authService.registerService({
        nombre,
        apellido,
        email,
        password,
        rol: 'user',
      });

      if (!newUser) {
        this.isloadingSubmitBtn = false;
      }

      this._toast.getToast('Usuario registrado con exito', 'middle', 'success');
      this._router.navigateByUrl('/auth/login');
      this.isloadingSubmitBtn = false;
    } catch (error) {
      console.log(error);
      this._toast.getToast('Error al registrar', 'middle', 'danger');
      this.isloadingSubmitBtn = false;
    }
  }
}
