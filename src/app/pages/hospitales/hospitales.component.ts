import { Hospital } from './../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public _hospitalService: HospitalService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(
      (resp: any) => {
        this.cargarHospitales();
      }
    );
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
      .subscribe((resp: any) => {

        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.hospitales.length;
        this.cargando = false;
        console.log(this.hospitales, this.totalRegistros);
      });

  }

  buscarHospital(termino: string) {
    if (termino == "") {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital(termino).subscribe(
      (resp: any) => {
        this.hospitales = resp.hospitales;
      }
    );
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(
          (resp: any) => {            
            this.cargarHospitales();
            swal('Hospital Borrado', 'El hospital ha sido eliminado correctamente', 'success');
          });
      }
    })
  }
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe((resp: any) => {
        console.log(resp);
      })
  }

  crearHospital() {

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
              .subscribe( () => this.cargarHospitales() );

    });

  }

}
