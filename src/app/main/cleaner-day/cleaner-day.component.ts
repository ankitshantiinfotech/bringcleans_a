import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';
@Component({
  selector: 'app-cleaner-day',
  templateUrl: './cleaner-day.component.html',
  styleUrls: ['./cleaner-day.component.scss'],
  providers: [ AppGlobals]
})
export class CleanerDayComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) {window.scrollTo(0, 0); }

  ngOnInit() {
  }

}
