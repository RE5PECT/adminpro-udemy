import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService } from 'src/app/services/service.index';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    SettingsService,
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }
