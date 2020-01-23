import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
  providers: [ AppGlobals]
})
export class HelpPageComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) { window.scrollTo(0, 0);}

  logged = false;
  ngOnInit() {

    if(!localStorage.getItem('uid'))
        this.logged=false;
    else
        this.logged=true;
  }

}
