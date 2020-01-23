import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-before-login-footer',
  templateUrl: './before-login-footer.component.html',
  styleUrls: ['./before-login-footer.component.scss']
})
export class BeforeLoginFooterComponent implements OnInit {
  today = new Date();
  constructor() { }

  ngOnInit() {
  }

}
