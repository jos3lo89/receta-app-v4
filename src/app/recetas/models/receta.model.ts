export interface Receta {
  nombre: string;
  // hora: number;
  minutos: number;
  ingredientes: string[];
  preparacion: string[];
  region: string;
  tipo: string;
  porciones: number;
  imagenes: string[];
  // infoNutricional: {
  //   energia: number;
  //   carbohidratos: number;
  //   grasas: number;
  //   fibra: number;
  //   proteina: number;
  //   grasasSaturadas: number;
  //   sodio: number;
  //   azucares: number;
  // };
}
