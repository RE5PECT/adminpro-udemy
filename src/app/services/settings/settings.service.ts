import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    tema: 'default.css',
    temaUrl: 'assets/css/colors/default.css'
  }
  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes))
  }

  cargarAjustes(){
    if (localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }
    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema:string){
    let url = 'assets/css/colors/'+ tema + '.css';

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
    this._document.getElementById('tema').setAttribute('href', url);
  }
}

interface Ajustes{
  tema: string, 
  temaUrl: string
}