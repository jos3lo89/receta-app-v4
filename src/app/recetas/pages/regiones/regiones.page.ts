import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
} from '@ionic/angular/standalone';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { RecetaFirebase } from '../../models/receta.model';

@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.page.html',
  styleUrls: ['./regiones.page.scss'],
  standalone: true,
  imports: [
    IonCardHeader,
    IonImg,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class RegionesPage implements OnInit {
  private _rutaActiva = inject(ActivatedRoute);
  private _recetaService = inject(RecetaService);
  private _router = inject(Router);

  param = {
    region: '',
  };

  recetas: RecetaFirebase[] = [];

  constructor() {
    this._rutaActiva.queryParams.subscribe((params) => {
      if (params['reg']) {
        this.param.region = params['reg'];
        this.obtenerRecetas(params['reg']);
      }
    });
  }

  ngOnInit() {}

  obtenerRecetas(region: string) {
    this._recetaService.recetasPorRegion(region).subscribe({
      next: (data) => {
        this.recetas = data;
        console.log(`recetas de ${region}`, data);
      },
      error: (error) => {
        console.log(`Error al obetener las recetas de la  ${region}`, error);
      },
    });
  }

  irDetalles(id: string) {
    const param: NavigationExtras = {
      queryParams: {
        id,
      },
    };

    this._router.navigate(['/recetas/detalles'], param);
  }
}
