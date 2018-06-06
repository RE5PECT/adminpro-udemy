import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
    declarations: [
        BreadcrumsComponent,
        HeaderComponent,
        NotfoundComponent,
        SidebarComponent
    ],
    imports: [ CommonModule ],
    exports: [
        BreadcrumsComponent,
        HeaderComponent,
        NotfoundComponent,
        SidebarComponent
    ],
    providers: [],
})
export class SharedModule {}