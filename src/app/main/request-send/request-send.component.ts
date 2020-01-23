import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-request-send',
  templateUrl: './request-send.component.html',
  styleUrls: ['./request-send.component.scss'],
  providers: [ AppGlobals]
})
export class RequestSendComponent implements OnInit {
  startdate: any = null;
  startmonth: any = null;
  time = '';
  tishdate: any;
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) { window.scrollTo(0, 0);}

  ngOnInit() {
    if (localStorage.getItem('ondate') == 'null' || localStorage.getItem('ondate') == null) {
      this.router.navigate(['/welcomeback']);
    }
    const user = localStorage.getItem('uid');
    const first = localStorage.getItem('first_name');
    const last = localStorage.getItem('last_name');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const ondateVal = localStorage.getItem('ondate');
    this.tishdate = ondateVal;
    const zip = localStorage.getItem('postcode');
    const needforval = localStorage.getItem('needfor');
    const preftimeval = localStorage.getItem('preftime');
    const timeforval = localStorage.getItem('timefor');
    const dateD = preftimeval.split(':');
    this.time = dateD[0] + ':' + dateD[1];
    const datedata = new Date(ondateVal);
    const months = [
      'januari', 'februari', 'mars', 'april', 'maj', 'juni',
      'juli', 'augusti', 'september', 'oktober', 'november', 'december'
    ];
    this.startdate = datedata.getDate();
    this.startmonth = months[datedata.getMonth()];
    localStorage.clear();
    localStorage.setItem('uid', user);
    localStorage.setItem('first_name', first);
    localStorage.setItem('last_name', last);

    localStorage.setItem('access', accessI);
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('device_id', deviceId);
    localStorage.setItem('device_type', deviceType);
  }

}
