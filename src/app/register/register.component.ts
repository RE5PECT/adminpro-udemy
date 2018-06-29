import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/service.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this._usuarioService.getUsuarios().subscribe(
    (resp)=> console.log(resp),
    (err) => console.error(err)
    );
  }

  ngOnInit() {
  }

}
