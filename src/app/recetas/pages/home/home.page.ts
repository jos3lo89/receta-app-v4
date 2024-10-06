import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
} from '@ionic/angular/standalone';
import { RegionesComponent } from './components/regiones/regiones.component';
import { TopPeruComponent } from './components/top-peru/top-peru.component';
import { MasRecientesComponent } from './components/mas-recientes/mas-recientes.component';
import { RecetaService } from '../../services/receta.service';
import { RecetaFirebase } from '../../models/receta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RegionesComponent,
    TopPeruComponent,
    MasRecientesComponent,
  ],
})
export default class HomePage implements OnInit {
  private _recetaService = inject(RecetaService);

  recetas: RecetaFirebase[] = [];

  constructor() {}

  ngOnInit() {
    this.obtenerRecetas();
  }

  obtenerRecetas() {
    this._recetaService.recetasData().subscribe({
      next: (data) => {
        this.recetas = data;
        console.log('recetas: ', this.recetas);
      },
      error: (error) => {
        console.log('Error al obeter recetas', error);
      },
    });
  }
}
