import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http:HttpClient) { }


  getUsuarios():Observable<any>{
    return this._http.get('http://localhost:3000/usuario');
  }
}
