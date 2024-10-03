import { Component, OnInit } from '@angular/core';
import { IonToolbar, IonAvatar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true,
  imports: [IonAvatar, IonToolbar, ],
})
export class MainHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
