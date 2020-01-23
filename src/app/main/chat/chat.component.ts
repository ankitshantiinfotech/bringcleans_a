import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ AppGlobals]
})
export class ChatComponent implements OnInit {

  constructor(private baseUrl: AppGlobals) { }

  ngOnInit() {
  }

}
