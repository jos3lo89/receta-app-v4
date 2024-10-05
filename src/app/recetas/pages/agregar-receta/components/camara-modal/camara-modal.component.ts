import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { close, camera, image } from 'ionicons/icons';
import {
  IonModal,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonIcon,
  IonButton,
  IonButtons,
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-camara-modal',
  templateUrl: './camara-modal.component.html',
  styleUrls: ['./camara-modal.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonModal,
  ],
})
export class CamaraModalComponent implements OnInit {
  ngOnInit(): void {}

  constructor() {
    addIcons({ close, camera, image });
  }

  @Input() isOpen = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() captureEvent = new EventEmitter<string>();

  CameraSource = CameraSource;

  closeModal() {
    this.closeModalEvent.emit();
  }

  async takePicture(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: source,
      });
      this.captureEvent.emit(image.dataUrl);
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }
}
