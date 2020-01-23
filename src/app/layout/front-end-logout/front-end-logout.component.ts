import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-end-logout',
  templateUrl: './front-end-logout.component.html',
  styleUrls: ['./front-end-logout.component.scss']
})
export class FrontEndLogoutComponent implements OnInit {
  unlogged = true;
  constructor() { }

  ngOnInit() {
  }

}
