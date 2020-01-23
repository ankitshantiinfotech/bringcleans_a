import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';
@Component({
  selector: 'app-pricing2-page',
  templateUrl: './pricing2-page.component.html',
  styleUrls: ['./pricing2-page.component.scss'],
  providers: [ AppGlobals]
})
export class Pricing2PageComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) {window.scrollTo(0, 0); }

  ngOnInit() {
  }
  letsGo() {}
}
