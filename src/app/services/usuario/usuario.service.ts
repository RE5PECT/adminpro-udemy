import { BASE_URL } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('servicio de usuario listo');
  }

  getUsuarios() {
    return this.http.get(BASE_URL + '/usuario');
  }

}
