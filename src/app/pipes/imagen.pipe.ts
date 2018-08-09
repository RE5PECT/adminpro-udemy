import { BASE_URL } from './../services/config';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

    let url = BASE_URL + '/img';  
   

    if (!img) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuarios':
        url += '/usuarios/' + img;
        break;
      case 'medicos':
        url += '/medicos/' + img;
        break;
      case 'hospitales':
        url += '/hospitales' + img;
        break;
      default:
        console.log('tipo de imagen no existe');
        url += '/usuarios/xxx';
        break;
    }

    return url;
  }

}
