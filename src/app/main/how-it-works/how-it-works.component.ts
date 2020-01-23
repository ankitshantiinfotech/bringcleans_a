import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  providers: [ AppGlobals]
})
export class HowItWorksComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) {window.scrollTo(0, 0); }

  ngOnInit() {
  }

  letsGo() {

  }

}
