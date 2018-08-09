import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  grafico5: any;
  data: any;

  constructor(public _usuarioService: UsuarioService) {
    this.grafico5 = {
      'labels': [],
      'data': [],
      'type': 'doughnut',
      'leyenda': 'Usuarios por Rol'
    };
    this._usuarioService.obtenerGrafica1().subscribe(
      (resp: any) => {
        resp.data.forEach(data => {
          this.grafico5.labels.push(data._id);
          this.grafico5.data.push(data.count);
        });
        console.log(this.grafico5);
        this.graficos.grafico5 = this.grafico5;
      }
    );
  }


  ngOnInit() {
  }

  graficos: any = {
    'grafico1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data': [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'El pan se come con'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data': [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data': [95, 5],
      'type': 'doughnut',
      'leyenda': '¿Le dan gases los frijoles?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data': [85, 15],
      'type': 'doughnut',
      'leyenda': '¿Le importa que le den gases?'
    }
  };

}