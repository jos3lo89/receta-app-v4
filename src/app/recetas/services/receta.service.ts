import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Receta } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {


  private _storage = inject(Storage);
  private _firestore = inject(Firestore);

  constructor() {}

  async subirFoto(base64Data: string) {
    try {
      const base64Parts = base64Data.split(';base64,');
      const contentType = base64Parts[0].split(':')[1];
      const base64String = base64Parts[1];

      const imgRef = ref(
        this._storage,
        `imagenes/${Date.now()}-${Math.floor(
          Math.random() * (9999 - 1000 + 1) + 1000
        )}-${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`
      );

      const uploadResult = await uploadString(imgRef, base64String, 'base64', {
        contentType,
      });
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error al subir la imagen a Firebase:', error);
      return false;
    }
  }

  async subirReceta(receta: Receta): Promise<boolean> {
    const urlFoto = await this.subirFoto(receta.imagenes[0]);

    if (urlFoto) {
      try {
        const recetasRef = collection(this._firestore, 'recetas');
        await addDoc(recetasRef, { ...receta, imagenes: [urlFoto] });
        return true;
      } catch (error) {
        console.error('Error al subir la receta: ', error);
        return false;
      }
    } else {
      return false;
    }
  }
}
