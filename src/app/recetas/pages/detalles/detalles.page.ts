import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonSpinner,
  IonText,
  IonIcon,
  IonList,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonButton,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from '../../services/receta.service';
import { RecetaFirebase } from '../../models/receta.model';
import { addIcons } from 'ionicons';
import { peopleOutline, timerOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonButton,
    IonLabel,
    IonItem,
    IonCheckbox,
    IonList,
    IonIcon,
    IonText,
    IonSpinner,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class DetallesPage implements OnInit {
  private _activateRoute = inject(ActivatedRoute);
  private _recetaService = inject(RecetaService);
  private _route = inject(Router);

  params = {
    id: '',
    back: '',
  };

  backBtn = false;

  receta: RecetaFirebase | null = null;

  constructor() {
    addIcons({ timerOutline, peopleOutline });

    this._activateRoute.queryParams.subscribe((param) => {
      if (param['id'] || param['back']) {
        this.params.id = param['id'];
        this.params.back = param['back'];

        this.backBtn = param['back'] == 'categorias' ? true : false;

        this.obetenerDetalles(param['id']);
      }
    });
  }

  ngOnInit() {}

  obetenerDetalles(id: string) {
    this._recetaService.recetasPorId(id).subscribe({
      next: (data) => {
        this.receta = data;
        console.log('Detalles de receta', data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  backRoute(backRoute: string) {
    this._route.navigate([`/recetas/${backRoute}`], {
      queryParams:
        this.params.back == 'categorias'
          ? {}
          : {
              reg: this.receta?.region,
            },
    });
  }
}
