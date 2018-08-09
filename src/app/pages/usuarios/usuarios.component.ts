import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
    '.profile-pic{ max-width:50px;}'
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(
      (resp:any) => {
        this.cargarUsuarios();
      }
    );
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });

  }
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino == "") {
      this.cargarUsuarios();
      return;
    }
    this._usuarioService.buscarUsuarios(termino).subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      }
    );
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      console.log(borrar);
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(
          (resp: any) => {
            console.log(resp);
            this.cargarUsuarios();
            swal('Usuario Borrado', 'El usuario ha sido eliminado correctamente', 'success');
          });
      }
    })
  }
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}
