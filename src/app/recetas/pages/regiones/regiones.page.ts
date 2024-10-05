import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.page.html',
  styleUrls: ['./regiones.page.scss'],
  standalone: true,
  imports: [
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
  
  param = {
    region: '',
  };

  constructor() {
    this._rutaActiva.queryParams.subscribe((params) => {
      if (params['reg']) {
        this.param.region = params['reg'];
      }
    });
  }

  ngOnInit() {}
}
