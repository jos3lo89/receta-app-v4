import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, IonText, IonItem, IonButton, IonIcon, IonLabel, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.page.html',
  styleUrls: ['./agregar-receta.page.scss'],
  standalone: true,
  imports: [IonList, IonLabel, IonIcon, IonButton, IonItem, IonText, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export default class AgregarRecetaPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
