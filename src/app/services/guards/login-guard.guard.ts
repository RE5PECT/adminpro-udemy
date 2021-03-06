import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public _router: Router) {

  }
  canActivate(): boolean {
    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      this._router.navigate(['/login']);
    }
  }
}
