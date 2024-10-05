import { Component, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit() {}
}
