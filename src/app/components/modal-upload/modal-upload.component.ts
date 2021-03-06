import { UploadService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string;

  constructor(public _uploadService: UploadService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {

  }


  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error')
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();


    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }


  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }
  subirImagen() {
    this._uploadService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp => {
        console.log(resp);
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(err => {
        console.log("Error en la carga");
      })
  }

}
