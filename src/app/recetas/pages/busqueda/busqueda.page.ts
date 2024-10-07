import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCardHeader,
  IonText,
} from '@ionic/angular/standalone';
import { RecetaService } from '../../services/receta.service';
import { RecetaFirebase } from '../../models/receta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonCardHeader,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonCardContent,
    IonCard,
    IonButton,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class BusquedaPage implements OnInit {
  private _recetaService = inject(RecetaService);
  private _router = inject(Router);

  recetas: RecetaFirebase[] = [];
  nombreBusqueda: string = '';

  constructor() {}

  ngOnInit() {}

  buscar() {
    if (this.nombreBusqueda.trim()) {
      console.log(this.nombreBusqueda);
      this.obtenerRecetas(this.nombreBusqueda);
    }
  }

  obtenerRecetas(nombre: string) {
    this._recetaService.recetasPorNombre(nombre).subscribe({
      next: (data) => {
        this.recetas = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  irDetalles(id: string) {
    this._router.navigate(['/recetas/detalles'], {
      queryParams: {
        id,
        back: 'busqueda',
      },
    });
  }
}
