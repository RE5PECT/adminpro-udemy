import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService } from 'src/app/services/service.index';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';
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
    SidebarService
  ]
})
export class ServiceModule { }
