import { Component, OnInit } from "@angular/core";
import { Paciente, TipoIdentificacion } from '../../model/paciente';
import { PacienteService } from "../../services/paciente.service";
import { Profesional } from '../../model/profesional';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: "paciente",
  templateUrl: "./paciente.component.html",
  styleUrls: ["./paciente.component.scss"]
})
export class PacienteComponent implements OnInit {
  lstPacientes: Paciente[] = [];
  registroPaciente: Paciente;
  nuevoPaciente: boolean = false;

  constructor(private _pacienteService: PacienteService,private router:Router) {}

  ngOnInit() {
    this._pacienteService.obtenerPacientes().subscribe((resp: any) => {
      for (let clave in resp) {
        this.registroPaciente = resp[clave];
        this.registroPaciente.id = clave;
        if(this.registroPaciente.profesionalesAsignados&& this.registroPaciente.profesionalesAsignados.length > 0){
          this.actualizarEstadoProfesionales(this.registroPaciente);
        }
        this.lstPacientes.push(this.registroPaciente);
      }
    });
  }

  atenderPaciente(paciente:Paciente){
    this.router.navigate(['/pages/components/atender',paciente.id])
  }

  actualizarEstadoProfesionales(paciente:Paciente){
    let listaProfesionales:Profesional[]=this._pacienteService.obtenerListaProfesionales();
    for (let profesional in paciente.profesionalesAsignados) {
     
      let indice=listaProfesionales.findIndex(d=>d.cedula==paciente.profesionalesAsignados[profesional].cedula);
      listaProfesionales[indice].ocupado=indice >=0;
   }
  }

  eliminarRegistroPaciente(paciente:Paciente){
   let indice=this.lstPacientes.findIndex(d=>d.cedula==paciente.cedula);


    swal({
      title: 'Eliminar registro paciente',
      text:  `¿Seguro que desea eliminar el registro del paciente ${paciente.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this._pacienteService.eliminarPaciente(paciente).subscribe((resp)=>{
          if(paciente.profesionalesAsignados && paciente.profesionalesAsignados.length > 0){
            this.liberarProfesionalesPacienteEliminado(paciente);
          }
          this.lstPacientes.splice(indice,1);
          swal('Eliminado!','El paciente a sido eliminado correctamente','success')
        })
      }
    })
  }

liberarProfesionalesPacienteEliminado(pacienteEliminado:Paciente){
  let listaProfesionales:Profesional[]=this._pacienteService.obtenerListaProfesionales();
   for(let profesional in pacienteEliminado.profesionalesAsignados){
       listaProfesionales.filter(d=>d.cedula==pacienteEliminado.profesionalesAsignados[profesional].cedula)[0].ocupado=false;
   }
}

}
