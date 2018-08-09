import { BASE_URL } from './../config';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() {
    
  }


  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();


      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("imagen subida");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("fallo la subida")
            reject(JSON.parse(xhr.response));
          }
        }
      };

      let url = BASE_URL + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    })



  }
}
