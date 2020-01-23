import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-after-login-footer',
  templateUrl: './after-login-footer.component.html',
  styleUrls: ['./after-login-footer.component.scss']
})
export class AfterLoginFooterComponent implements OnInit {

  constructor() { }

  emailstring = 'mailto:info@bringclean.se';

  ngOnInit() {
    
  }

}
