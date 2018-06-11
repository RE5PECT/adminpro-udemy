import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settings: SettingsService) {     
  }

  ngOnInit() {     
    this.colocarCheck();    
  }

  cambiarColor(tema:string, link: any){
    this.aplicarCheck(link);    
    this._settings.aplicarTema(tema);
  }

  aplicarCheck(link:any){
    let selectores = document.getElementsByClassName('selector');
    for ( let ref of <any>selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    let selectores = document.getElementsByClassName('selector');
    let tema = this._settings.ajustes.tema;
    for ( let ref of <any>selectores){
      if ( ref.getAttribute("data-theme") == tema)
      {
        ref.classList.add('working');
      }
      else
      {
        ref.classList.remove('working');
      }      
    }
  }
}
