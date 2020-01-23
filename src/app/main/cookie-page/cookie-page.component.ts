import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-cookie-page',
  templateUrl: './cookie-page.component.html',
  styleUrls: ['./cookie-page.component.scss'],
  providers: [ AppGlobals]
})
export class CookiePageComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) {window.scrollTo(0, 0); }

  logged = false;
  ngOnInit() {

    if(!localStorage.getItem('uid'))
        this.logged=false;
    else
        this.logged=true;
  }

}
