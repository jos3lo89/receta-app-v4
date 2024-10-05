import { Component, OnInit } from '@angular/core';
import top10 from './data-access/top10peru';
import {
  IonList,
  IonGrid,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-top-peru',
  templateUrl: './top-peru.component.html',
  styleUrls: ['./top-peru.component.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonItem, IonGrid, IonList],
})
export class TopPeruComponent implements OnInit {
  top10data = top10;
  constructor() {}

  ngOnInit() {}
}
