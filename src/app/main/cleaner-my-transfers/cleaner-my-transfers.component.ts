import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-cleaner-my-transfers',
  templateUrl: './cleaner-my-transfers.component.html',
  styleUrls: ['./cleaner-my-transfers.component.scss'],
  providers: [ AppGlobals]
})
export class CleanerMyTransfersComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) { window.scrollTo(0, 0);}

  ngOnInit() {
  }

}
