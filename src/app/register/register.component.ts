import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _usuario: UsuarioService) { 

    this._usuario.getUsuarios().subscribe(
      (data) => console.log(data)
    );
  }

  ngOnInit() {
  }

}
