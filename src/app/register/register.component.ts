import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario.model';

import swal from 'sweetalert';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this._usuarioService.getUsuarios().subscribe(
      (resp) => console.log(resp),
      (err) => console.error(err)
    );
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      }

    }
  }
  ngOnInit() {

    this.form = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {
        validators: this.sonIguales('password', 'password2')
      });

    this.form.setValue({
      nombre: 'Test',
      correo: 'Test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }
  registrarUsuario() {
    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    let user = new Usuario(this.form.value.nombre, this.form.value.correo, this.form.value.password);
    this._usuarioService.guardarUsuario(user).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.error(err);
      }
    )

  }

}
