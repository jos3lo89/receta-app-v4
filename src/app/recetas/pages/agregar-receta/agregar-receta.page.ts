import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonItem,
  IonButton,
  IonIcon,
  IonLabel,
  IonList,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { ToastService } from 'src/app/shared/services/toast.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { CamaraModalComponent } from './components/camara-modal/camara-modal.component';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.page.html',
  styleUrls: ['./agregar-receta.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonLabel,
    IonIcon,
    IonButton,
    IonItem,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonSelectOption,
    CamaraModalComponent,
  ],
})
export class AgregarRecetaPage implements OnInit {
  recipeForm: FormGroup;
  isModalOpen = false;
  capturedImages: string[] = [];

  private _formBuilder = inject(FormBuilder);
  private _recetaService = inject(RecetaService);
  private _toast = inject(ToastService);

  constructor() {
    addIcons({ add });

    this.recipeForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      hora: ['', Validators.required],
      minutos: ['', Validators.required],
      ingredientes: this._formBuilder.array([this._formBuilder.control('')]),
      preparacion: this._formBuilder.array([this._formBuilder.control('')]),
      region: ['', Validators.required],
      tipo: ['', Validators.required],
      porciones: [1, Validators.required],
      imagenes: this._formBuilder.array([]),
      infoNutricional: this._formBuilder.group({
        carbohidratos: ['', Validators.required],
        energia: ['', Validators.required],
        grasas: ['', Validators.required],
        fibra: ['', Validators.required],
        proteina: ['', Validators.required],
        grasasSaturadas: ['', Validators.required],
        sodio: ['', Validators.required],
        azucares: ['', Validators.required],
      }),
    });
  }
  ngOnInit() {}

  get ingredientes() {
    return this.recipeForm.get('ingredientes') as FormArray;
  }

  get preparacion() {
    return this.recipeForm.get('preparacion') as FormArray;
  }

  get imagenes() {
    return this.recipeForm.get('imagenes') as FormArray;
  }

  addIngrediente() {
    this.ingredientes.push(this._formBuilder.control(''));
  }

  addPreparacion() {
    this.preparacion.push(this._formBuilder.control(''));
  }

  capturedImage: string | undefined;

  handleCapture(imageDataUrl: string) {
    this.capturedImages.push(imageDataUrl);
    this.imagenes.push(this._formBuilder.control(imageDataUrl));
    this.closeModal();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  isLoading = false;
  async onSubmit() {
    if (this.recipeForm.valid) {
      this.isLoading = true;

      const success = await this._recetaService.subirReceta(
        this.recipeForm.value
      );

      if (success) {
        this._toast.getToast('Receta subida exitosamente', 'middle', 'success');
        this.resetFrom();
      } else {
        this._toast.getToast('Error al subir la receta', 'middle', 'danger');
      }

      this.isLoading = false;
    } else {
      this._toast.getToast('Formulario inválido', 'middle', 'warning');
    }
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  resetFrom() {
    this.recipeForm.reset();
    this.clearFormArray(this.ingredientes);
    this.clearFormArray(this.preparacion);
    this.addIngrediente();
    this.addPreparacion();
    this.capturedImages = [];
  }
}
