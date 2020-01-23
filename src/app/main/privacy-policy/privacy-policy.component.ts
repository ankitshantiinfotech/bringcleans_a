import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  providers: [ AppGlobals]
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) {window.scrollTo(0, 0); }

  logged = false;
  ngOnInit() {

    if(!localStorage.getItem('uid'))
        this.logged=false;
    else
        this.logged=true;
  }

}
