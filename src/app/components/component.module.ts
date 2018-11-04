import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ComponentRoutingModule } from './component-rounting';
import { ThemeModule } from '../@theme/theme.module';

//Componentes
import { ProductoComponent } from './producto/producto.component';
import { PacienteComponent } from './paciente/paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './usuario/usuario.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { AtenderPacienteComponent } from './atender-paciente/atender-paciente.component';


@NgModule({
  imports: [
    CommonModule,
    ComponentRoutingModule,
    ThemeModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [UsuarioComponent, ProductoComponent, PacienteComponent, NuevoPacienteComponent, AtenderPacienteComponent]
})
export class ComponentModule { }
