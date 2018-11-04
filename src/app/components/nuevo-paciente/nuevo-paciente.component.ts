import { Component, OnInit } from "@angular/core";
import { Paciente, TipoIdentificacion } from "../../model/paciente";
import { PacienteService } from "../../services/paciente.service";
import swal from 'sweetalert2';

@Component({
  selector: "nuevo-paciente",
  templateUrl: "./nuevo-paciente.component.html",
  styleUrls: ["./nuevo-paciente.component.scss"]
})
export class NuevoPacienteComponent implements OnInit {
  registroPaciente: Paciente = new Paciente();
  tipoDocumento: string = "selec";
  constructor(private _pacienteService: PacienteService) {}

  ngOnInit() {}

  almacenarRegistroPaciente() {
    this.registroPaciente.tipoIdentificacion =this.tipoDocumento == "cedula"? TipoIdentificacion.Cedula: TipoIdentificacion.TarjetaIdentidad;
    
    swal({
      title: 'Almacenar Registro',
      text: "¿Seguro que desea almacenar el registro del paciente?" ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this._pacienteService.almacenarPaciente(this.registroPaciente).subscribe(resp => {
          swal('Almacenado!','El registro del paciente ' + this.registroPaciente.nombre + " ha sido almacenado correctamente.",'success')
        });
        
      }
    })
  }
}
