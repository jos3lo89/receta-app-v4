import { Component, Input, OnInit } from '@angular/core';
import recientesRecetas from './data-access/recientes';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { RecetaFirebase } from 'src/app/recetas/models/receta.model';

@Component({
  selector: 'app-mas-recientes',
  templateUrl: './mas-recientes.component.html',
  styleUrls: ['./mas-recientes.component.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonCardHeader,
    IonImg,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
  ],
})
export class MasRecientesComponent implements OnInit {
  @Input() recetas: RecetaFirebase[] = [];

  recientesRecetas = recientesRecetas;

  constructor() {}

  ngOnInit() {}
}
