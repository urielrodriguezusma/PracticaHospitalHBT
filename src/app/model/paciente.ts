import { Persona } from "./persona";
import { Profesional } from "./profesional";

export class Paciente extends Persona {
  id:string;
  tipoIdentificacion: TipoIdentificacion;
  mostrarProfesionales: boolean;
  mostrarHistorial:boolean;
  historial?: string;
  profesionalesAsignados?: Profesional[];
  requiere?:string[];
}

export enum TipoIdentificacion {
  TarjetaIdentidad,
  Cedula
}
