import { BASE_URL } from '../config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private _http: HttpClient,
    private _usuarioService: UsuarioService) { }


  cargarHospitales() {
    return this._http.get(BASE_URL + '/hospital');
  }
  obtenerHospital(id: string) {
    return this._http.get(BASE_URL + '/hospital/' + id);
  }

  borrarHospital(id: string) {
    let url = BASE_URL + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this._http.delete(url);
  }

  crearHospital(nombre: string) {
    return this._http.post(BASE_URL + '/hospital?token=' + this._usuarioService.token, { nombre });
  }

  buscarHospital(termino: string) {
    return this._http.get(BASE_URL + '/busqueda/coleccion/hospital/' + termino);
  }

  actualizarHospital(hospital: Hospital) {
    let url = BASE_URL + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this._http.put(url, hospital)
    .pipe(
      map((resp: any) => {
        swal('Hospital Actualizado', hospital.nombre, 'success');
        return true;
      }));
  }
}
