import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        BreadcrumsComponent,
        HeaderComponent,
        NotfoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule
    ],
    exports: [
        BreadcrumsComponent,
        HeaderComponent,
        NotfoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ],
    providers: [],
})
export class SharedModule { }