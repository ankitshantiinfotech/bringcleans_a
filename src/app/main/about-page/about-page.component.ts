import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  providers: [ AppGlobals]
})
export class AboutPageComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) {
    window.scrollTo(0, 0);
   }

   logged = false;
   ngOnInit() {
 
     if(!localStorage.getItem('uid'))
         this.logged=false;
     else
         this.logged=true;
   }

}
