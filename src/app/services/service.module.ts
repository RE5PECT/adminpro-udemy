import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './service.index';
import { SharedService } from './service.index';
import { SidebarService } from './service.index';
import { UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers:[
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService
  ]
})
export class ServiceModule { }
