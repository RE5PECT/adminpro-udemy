import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [];
  constructor(public _usuarioService:UsuarioService) {
    this.cargarMenu();
   }

   cargarMenu(){
    this.menu = this._usuarioService.menu;
   }
}
