import { Usuario } from './../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;


  constructor(public router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 0) {
      this.recuerdame = true;
    }

    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '359005390626-5hmo09uo3r8magok15dh4pe7jbcbf62o.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      })
      this.attachSignIn(document.getElementById('btnGoogle'));
    })

  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe((ok) => {
          window.location.href = '/dashboard';
        });
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, this.recuerdame)
      .subscribe(resp => {
        window.location.href = '/dashboard';
      });
  }


 
}
