import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public _settings: SettingsService){ }
  
  
  ngOnInit(){

  }


}
