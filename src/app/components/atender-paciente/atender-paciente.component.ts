import { Component, OnInit } from "@angular/core";
import { PacienteService } from "../../services/paciente.service";
import { Paciente } from "../../model/paciente";
import { ActivatedRoute } from "@angular/router";
import { Profesional } from "../../model/profesional";

import swal from 'sweetalert2';

@Component({
  selector: "atender-paciente",
  templateUrl: "./atender-paciente.component.html",
  styleUrls: ["./atender-paciente.component.scss"]
})
export class AtenderPacienteComponent implements OnInit {
  PacienteAtender: Paciente;
  listaProfesionales: Profesional[] = [];

  constructor(
    private pacienteService: PacienteService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listaProfesionales = this.pacienteService.lstProfesionales;

    let idPaciente = this.activateRoute.snapshot.paramMap.get("id");

    this.pacienteService.obtenerPacienteById(idPaciente).subscribe((resp: Paciente) => { 
        this.PacienteAtender = resp;
        this.PacienteAtender.id=idPaciente;
       
        if(!this.PacienteAtender.profesionalesAsignados || this.PacienteAtender.profesionalesAsignados.length ==0)
        {
          for (let profesional in this.listaProfesionales) {
            this.listaProfesionales[profesional].editable= this.listaProfesionales[profesional].ocupado ? false : true;
          } 
        }
        else
        {
          if (this.PacienteAtender.profesionalesAsignados) {
            for (let profesional in this.listaProfesionales) {
               let indice=this.PacienteAtender.profesionalesAsignados.findIndex(d=>d.cedula==this.listaProfesionales[profesional].cedula);
               
               if( this.listaProfesionales[profesional].ocupado){
                this.listaProfesionales[profesional].editable=indice >=0;
               }
               else{
                this.listaProfesionales[profesional].editable=true;
               }
            }
          }
        }

   
      });
  }

  asignarProfesionalToPacient(profesional: Profesional, estado) {
    if(!estado){
      let indice=this.PacienteAtender.profesionalesAsignados.findIndex(d=>d.cedula==profesional.cedula);
      this.PacienteAtender.profesionalesAsignados.splice(indice,1);
      let registroProfesional=this.listaProfesionales.filter(d=>d.cedula==profesional.cedula)[0];
      registroProfesional.ocupado=false;
      registroProfesional.editable=true;
    }
    else
    {
      if(!this.PacienteAtender.profesionalesAsignados){
        this.PacienteAtender.profesionalesAsignados=[];
      }
        profesional.ocupado=true;
        this.PacienteAtender.profesionalesAsignados.push(profesional);
    }
  }

  atenderPaciente(historial:string){

    swal({
      title: 'Atendiendo al paciente: ' + this.PacienteAtender.nombre,
      text: "¿Seguro que desea almacenar el registro del paciente?" ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.PacienteAtender.historial=historial;
        this.pacienteService.atenderPaciente(this.PacienteAtender).subscribe((resp)=>console.log(resp));
        swal('Atendido!','El paciente a sido atendido correctamente','success')
      }
    })
  }
  
}
