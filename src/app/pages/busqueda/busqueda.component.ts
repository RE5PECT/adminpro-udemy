import { Medico } from './../../models/medico.model';
import { Usuario } from './../../models/usuario.model';
import { BASE_URL } from './../../services/config';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[];
  medicos: Medico[];
  hospitales: Hospital[];



  constructor(public activatedRoute:ActivatedRoute,
              public http:HttpClient) {
    
    this.activatedRoute.params.subscribe(
      (params) =>{
        let termino = params["termino"];
        this.buscar(termino);
      }
    )
   }

  ngOnInit() {
    
   
  }

  buscar(termino:string){
    let url = BASE_URL + '/busqueda/todo/' + termino
    this.http.get(url).subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
      this.medicos =  resp.medicos;
      this.usuarios =  resp.usuarios;
    });
  }

}
