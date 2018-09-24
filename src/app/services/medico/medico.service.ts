import { Medico } from './../../models/medico.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../config';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;
  constructor(public _http: HttpClient, public _usuarioService: UsuarioService) { }


  cargarMedicos() {
    let url = BASE_URL + '/medico'
    return this._http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      }));
  }

  buscarMedicos(termino: string) {
    return this._http.get(BASE_URL + '/busqueda/coleccion/medico/' + termino).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.medicos.length;
        return resp.medicos;
      }));
  }

  borrarMedico(id: string) {
    return this._http.delete(BASE_URL + '/medico/' + id + '?token=' + this._usuarioService.token).pipe(

      map(resp => {
        swal('Medico Borrado', 'Medico borrado correctamtente', 'success');

        return resp;
      })
    );
  }
  guardarMedico(medico: Medico) {

    let url = BASE_URL + '/medico';

    if (medico._id){
      url += '/' + medico._id + '?token=' + this._usuarioService.token;
      return this._http.put(url, medico).pipe(
        map((resp: any) => {
          swal('Medico actualizado', resp.medico.nombre, 'success');
          return resp.medico;
        }))
    }else{
      url += '?token=' + this._usuarioService.token;
      return this._http.post(url, medico).pipe(
        map((resp: any) => {
          swal('Medico creado', '', 'success');
          return resp.medico;
        }))
    }
    

  }

  cargarMedico(id: string) {
    let url = BASE_URL + '/medico/' + id;

    return this._http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    )
  }


}
