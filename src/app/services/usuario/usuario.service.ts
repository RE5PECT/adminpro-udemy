import { BASE_URL } from '../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UploadService } from '../upload/upload.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = {}

  constructor(
    public http: HttpClient,
    public _router: Router,
    public _uploadService: UploadService
  ) {
    this.cargarStorage();
  }

  getUsuarios() {
    return this.http.get(BASE_URL + '/usuario');
  }
  guardarUsuario(user: Usuario) {
    console.log(user);
    return this.http.post(BASE_URL + '/usuario', {
      nombre: user.nombre,
      email: user.email,
      password: user.password
    }).pipe(
      catchError(
        (error: any) => {
          swal(error.error.mensaje, error.error.errors.message, 'error');
          throw error;
        }
      )
    );
  }
  actualizarUsuario(usuario: Usuario) {
    let url = BASE_URL + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(
        map((resp: any) => {
          swal('Usuario actualizado', usuario.nombre, 'success');
          this.guardarStorage(this.usuario._id, this.token, resp.usuario, this.menu);
          return true;
        }),
        catchError(
          (error: any) => {
            swal(error.error.mensaje, error.error.errors.message, 'error');
            throw error;
          }
        )
      );
  }

  cambiarImagen(file: File, id: string) {
    this._uploadService.subirArchivo(file, 'usuarios', this.usuario._id)
      .then((resp: any) => {
        console.log(resp.usuario);
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      })
  }
  cargarUsuarios(desde: number = 0) {
    let url = BASE_URL + '/usuario?desde=' + desde;
    return this.http.get(url);
  }
  buscarUsuarios(termino: string) {
    let url = BASE_URL + '/busqueda/coleccion/usuario/' + termino
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.usuarios;
      })
    );
  }

  obtenerGrafica1() {
    let url = BASE_URL + '/usuario/grafico1';
    return this.http.get(url);
  }

  logout() {
    this.usuario = null;
    this.token = "";
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this._router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(BASE_URL + '/login', usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError(
        (error: any) => {
          swal('Error en el login', error.error.mensaje, 'error');

          throw error;
        }
      )
    );
  }
  borrarUsuario(id: string) {
    let url = BASE_URL + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url);
  }

  loginGoogle(token: string) {
    return this.http.post(BASE_URL + '/login/google', { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

        return true;
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }
  estaLogueado(): boolean {
    return (this.token.length > 0) ? true : false;
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = {}
    }
  }

}
