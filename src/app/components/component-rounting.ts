import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { PacienteComponent } from './paciente/paciente.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { AtenderPacienteComponent } from './atender-paciente/atender-paciente.component';


const routes: Routes = [
    { path: 'usuarios', component: UsuarioComponent },
    { path: 'productos', component: ProductoComponent },
    { path: 'nuevopaciente', component: NuevoPacienteComponent },
    { path: 'pacientes', component: PacienteComponent },
    { path: 'atender/:id', component: AtenderPacienteComponent },
    { path: '', pathMatch:'full',redirectTo:'usuarios' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentRoutingModule {} 
