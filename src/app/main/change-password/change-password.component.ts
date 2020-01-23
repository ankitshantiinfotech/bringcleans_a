import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [ AppGlobals]
})
export class ChangePasswordComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) { window.scrollTo(0, 0);}

  ngOnInit() {
  }

}
