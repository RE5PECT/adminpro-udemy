import { Medico } from './../../models/medico.model';
import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})



export class MedicosComponent implements OnInit {

  totalRegistros: number = 0;
  medicos: Medico[] = [];
  constructor(private _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }


  crearMedico() {

   /* swal({
      title: 'Crear medico',
      text: 'Ingrese el nombre del medico',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this._medicoService.crearMedico(valor)
        .subscribe(() => this.cargarMedicos());

    });*/


  }
  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe(medicos => this.medicos = medicos);   
    this.totalRegistros = this._medicoService.totalMedicos;
  }

  buscarMedico(termino:string){
    if (termino == "") {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos(termino).subscribe(medicos => this.medicos = medicos);
    this.totalRegistros = this._medicoService.totalMedicos;
  }

  editarMedico(medico:Medico){

  }

  borrarMedico(medico:Medico){

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._medicoService.borrarMedico(medico._id).subscribe(
          (resp: any) => {
            console.log(resp);
            this.cargarMedicos();
            swal('Médico Borrado', 'El Médico ha sido eliminado correctamente', 'success');
          });
      }
    })
  }
}
