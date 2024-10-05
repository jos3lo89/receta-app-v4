import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
  standalone: true,
  imports: [IonButton],
})
export class LogOutComponent implements OnInit {
  @Output() clickMe = new EventEmitter<void>();

  constructor() {}
  ngOnInit() {}

  handleClick() {
    this.clickMe.emit();
  }
}
