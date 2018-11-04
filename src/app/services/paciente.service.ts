import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Paciente } from "../model/paciente";
import { Profesional } from "../model/profesional";

@Injectable({
  providedIn: "root"
})
export class PacienteService {
  url: string = "https://hospital-c2f41.firebaseio.com/Paciente";

  miHeader = new HttpHeaders({
    "Content-Type": "application/json"
  });

  lstProfesionales: Profesional[] = [
    {
      cedula: "1234",
      apellido: "Mendez",
      nombre: "John",
      ocupado: false,
      Especialidad: "Médico General",
      editable: true
    },
    {
      cedula: "98723",
      apellido: "Rincon",
      nombre: "Anita",
      ocupado: false,
      Especialidad: "Dermatóloga",
      editable: true
    },
    {
      cedula: "633845",
      apellido: "Quintero",
      nombre: "Maria Alejandra",
      ocupado: false,
      Especialidad: "Terapeuta",
      editable: true
    },
    {
      cedula: "1063768911",
      apellido: "Alzate Cordoba",
      nombre: "Fernanda",
      ocupado: false,
      Especialidad: "Psicóloga",
      editable: true
    }
  ];

  constructor(private httpClient: HttpClient) {}

  almacenarPaciente(nuevoPaciente: Paciente) {
    let body = JSON.stringify(nuevoPaciente);
    let miurl = `${this.url}/.json`;

    return this.httpClient.post(miurl, body, { headers: this.miHeader });
  }

  obtenerPacienteById(id: string) {
    let miurl = `${this.url}/${id}.json`;
    return this.httpClient.get(miurl);
  }

  obtenerPacientes() {
    return this.httpClient.get(`${this.url}.json`);
  }

  obtenerListaProfesionales(): Array<Profesional> {
    return this.lstProfesionales;
  }

  atenderPaciente(paciente: Paciente) {
    let urlActualisar = `${this.url}/${paciente.id}.json`;
    let body = JSON.stringify(paciente);
    return this.httpClient.put(urlActualisar, body, { headers: this.miHeader });
  }

  eliminarPaciente(paciente:Paciente){
    let urlEliminar=`${this.url}/${paciente.id}.json`;
    return this.httpClient.delete(urlEliminar);
  }
}
