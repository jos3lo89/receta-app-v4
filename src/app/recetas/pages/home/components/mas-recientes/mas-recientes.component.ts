import { Component, OnInit } from '@angular/core';
import recientesRecetas from './data-access/recientes';
import { IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardHeader, IonCardTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-mas-recientes',
  templateUrl: './mas-recientes.component.html',
  styleUrls: ['./mas-recientes.component.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonImg, IonCard, IonCol, IonRow, IonGrid, ],
})
export class MasRecientesComponent implements OnInit {
  recientesRecetas = recientesRecetas;
  constructor() {}

  ngOnInit() {}
}
