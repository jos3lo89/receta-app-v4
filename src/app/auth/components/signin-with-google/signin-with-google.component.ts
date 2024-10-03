import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-signin-with-google',
  templateUrl: './signin-with-google.component.html',
  styleUrls: ['./signin-with-google.component.scss'],
  standalone: true,
  imports: [IonButton],
})
export class SigninWithGoogleComponent implements OnInit {
  @Output() clickMe = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.clickMe.emit();
  }
}
