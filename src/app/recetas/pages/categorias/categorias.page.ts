import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCardHeader,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';

import { categorias } from './data-access/categorias';
import { RecetaService } from '../../services/receta.service';
import { RecetaFirebase } from '../../models/receta.model';
import { Router } from '@angular/router';

interface Categoria {
  name: string;
  img: string;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonSpinner,
    IonCardHeader,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class CategoriasPage implements OnInit {
  private _recetaService = inject(RecetaService);
  private _router = inject(Router);
  tipoDePlatos: Categoria[] = categorias;

  recetas: RecetaFirebase[] = [];

  constructor() {}

  ngOnInit() {}

  obtenerPlatos(tipo: string) {
    this._recetaService.platosPorTipo(tipo).subscribe({
      next: (data) => {
        this.recetas = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  detalles(id: string) {
    this._router.navigate(['/recetas/detalles'], {
      queryParams: {
        id,
        back: 'categorias',
      },
    });
  }
}
