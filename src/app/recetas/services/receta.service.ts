import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  endAt,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Receta, RecetaFirebase } from '../models/receta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private _storage = inject(Storage);
  private _firestore = inject(Firestore);

  private collectionName = 'recetas';

  constructor() {}

  async subirReceta(receta: Receta): Promise<boolean> {
    const urlFoto = await this.subirFoto(receta.imagenes[0]);

    if (urlFoto) {
      try {
        const recetasRef = collection(this._firestore, 'recetas');
        await addDoc(recetasRef, {
          ...receta,
          imagenes: [urlFoto],
          nombreNormalizado: receta.nombre.toLocaleLowerCase(),
        });
        return true;
      } catch (error) {
        console.error('Error al subir la receta: ', error);
        return false;
      }
    } else {
      return false;
    }
  }

  private async subirFoto(base64Data: string) {
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

  recetasData(): Observable<RecetaFirebase[]> {
    const collectionReference = collection(
      this._firestore,
      this.collectionName
    );

    return new Observable((observer) => {
      getDocs(collectionReference)
        .then((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as RecetaFirebase;
          });
          observer.next(items);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  recetasPorRegion(region: string): Observable<RecetaFirebase[]> {
    const collectionReference = collection(
      this._firestore,
      this.collectionName
    );

    const q = query(collectionReference, where('region', '==', region));
    return new Observable((observer) => {
      getDocs(q)
        .then((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as RecetaFirebase;
          });

          observer.next(items);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  recetasPorId(id: string): Observable<RecetaFirebase> {
    const documentReference = doc(this._firestore, `recetas/${id}`);

    return new Observable((observer) => {
      getDoc(documentReference)
        .then((querySnapshot) => {
          const item = {
            id: querySnapshot.id,
            ...querySnapshot.data(),
          } as RecetaFirebase;

          observer.next(item);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  platosPorTipo(tipo: string): Observable<RecetaFirebase[]> {
    const documentReference = collection(this._firestore, this.collectionName);
    const q = query(documentReference, where('tipo', '==', tipo));

    return new Observable((observer) => {
      getDocs(q)
        .then((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as RecetaFirebase;
          });

          observer.next(items);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  recetasPorNombre(nombre: string): Observable<RecetaFirebase[]> {
    const documentReference = collection(this._firestore, this.collectionName);

    const nombreMinuscula = nombre.toLocaleLowerCase();
    const endNombre = nombreMinuscula + '\uf8ff';

    const q = query(
      documentReference,
      orderBy('nombreNormalizado'),
      startAt(nombre),
      endAt(endNombre)
    );

    return new Observable((observer) => {
      getDocs(q)
        .then((querySnapshot) => {
          const items = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as RecetaFirebase;
          });

          observer.next(items);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
