import { Component, inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  IonList,
  IonGrid,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import dataR from './data-access/regiones';

@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
  styleUrls: ['./regiones.component.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonItem, IonGrid, IonList],
})
export class RegionesComponent implements OnInit {
  private _router = inject(Router);

  regionesData = dataR;

  constructor() {}

  ngOnInit() {}

  redirectCard(ruta: string, reg: string) {
    const params: NavigationExtras = {
      queryParams: {
        reg,
      },
    };

    this._router.navigate([ruta], params);
  }
}
