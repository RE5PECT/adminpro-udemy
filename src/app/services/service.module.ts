import { MedicoService } from './medico/medico.service';
import { HospitalService } from  './service.index';
import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './service.index';
import { SharedService } from './service.index';
import { SidebarService } from './service.index';
import { UsuarioService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './service.index';
import { UploadService } from './service.index';
import { VerificaTokenGuard } from './guards/verifica-token.guard';




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
    UsuarioService,
    LoginGuardGuard,
    UploadService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
