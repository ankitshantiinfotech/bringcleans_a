import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-account-your-detail',
  templateUrl: './account-your-detail.component.html',
  styleUrls: ['./account-your-detail.component.scss'],
  providers: [ AppGlobals]
})
export class AccountYourDetailComponent implements OnInit {
  details: any = {
    address: '',
    address2: '',
    stad: '',
    mobile: '',
    zipcode: ''
  };
  frequency = '';
  duration = '';
  startdate: any = null;
  attime = '';
  priceperhour: any;
  sevicefee: any;
  cost: any;
  totalcost: any;
  theCheckbox = false;
  error = '';
  mobErr = '';
  stadErr = '';
  zipcodeErr = '';
  addressErr = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0); }
  ngOnInit() {
    if (localStorage.getItem('selectCheckers') == null || localStorage.getItem('selectCheckers') == 'null') {
      this.router.navigate(['/welcomeback']);
    }
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const ondateVal = localStorage.getItem('ondate');
    const zip = localStorage.getItem('postcode');
    const needforval = localStorage.getItem('needfor');
    const preftimeval = localStorage.getItem('preftime');
    const timeforval = localStorage.getItem('timefor');
    const cleanersIds = localStorage.getItem('selectCheckers');
    const petscheck = localStorage.getItem('petscheck');
    const ironingcheck = localStorage.getItem('ironingcheck');
    const anothercheck = localStorage.getItem('anothercheck');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: 'cleaner@user#2',
      access: accessI,
      access_token: accessToken,
      ondate: ondateVal,
      postcode: zip,
      available_on_another: anothercheck,
      ironing: ironingcheck,
      pets: petscheck,
      needfor: needforval,
      preftime: preftimeval,
      timefor: timeforval,
      cleaners: JSON.parse(cleanersIds).join()
    };
    if (localStorage.getItem('address_1')) {
      this.details.address = localStorage.getItem('address_1');
    }
    if (localStorage.getItem('address_2')) {
      this.details.address2 = localStorage.getItem('address_2');
    }
    if (localStorage.getItem('stad')) {
      this.details.stad = localStorage.getItem('stad');
    }
    if (localStorage.getItem('postcode')) {
      this.details.zipcode = localStorage.getItem('postcode');
    }
    if (localStorage.getItem('mobile')) {
      this.details.mobile = localStorage.getItem('mobile');
    }
    this.auth.processBookingSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.error = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      this.frequency = needforval;
      if (needforval == 'weekly') {
        this.frequency = 'Varje vecka';
      } else if (needforval == 'byweekly') {
        this.frequency = 'Varannan vecka';
      } else if (needforval == 'once') {
        this.frequency = 'En gång';
      }
      this.duration = timeforval;
      const datedata = new Date(ondateVal);
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      this.startdate = datedata.getDate() + ' ' + months[datedata.getMonth()];
      const dateD = preftimeval.split(':');
      this.attime = dateD[0] + ':' + dateD[1];
      this.priceperhour = parseFloat(res.data.price_pe_hr).toFixed(2);
      this.sevicefee = parseFloat(res.data.trasport_tax).toFixed(2);
      this.cost = parseFloat(res.data.booking_total).toFixed(2);
      this.totalcost = parseFloat(res.data.alltotal).toFixed(2);
    });
  }
  checkedsame() {
    if (!this.theCheckbox) {
      this.details.address2 = this.details.address;
    } else {
      this.details.address2 = '';
    }
  }


  updateUser() {
    document.getElementById('proceed').setAttribute('disabled', 'disabled');
    const regMob = /^\d+$/;
    const firstTwo = this.details.mobile.substring(0, 2);
    if (this.details.address === '') { this.addressErr = 'Adress krävs.'; } else {
      this.addressErr = ''; }
    if (this.details.stad === '') { this.stadErr = 'Postort krävs'; } else {
      this.stadErr = ''; }
    /*if (this.details.zipcode === '') { this.zipcodeErr = 'Postnummer krävs'; } else {
        this.zipcodeErr = ''; }  */
    if (this.details.mobile === '') { this.mobErr = 'Mobilnummer krävs.'; } else {
      if (this.details.mobile.length < 10) { this.mobErr = 'Mobilnumret måste vara 10 nummer långt.'; } else {
        if (regMob.test(this.details.mobile) === false) { this.mobErr = 'ogiltigt mobilnummer.'; } else {
          if (firstTwo != '07') { this.mobErr = 'Mobilnumret måste börja med 07.';
          } else { this.mobErr = ''; }
        }
      }
  }
    if (this.details.address !== ''
      && this.details.stad !== ''
      && this.details.mobile !== ''
      && this.details.mobile.length >= 10
      && firstTwo == '07'
      && regMob.test(this.details.mobile) === true
    ) {
      localStorage.setItem('address_1', this.details.address);
      localStorage.setItem('address_2', this.details.address2);
      localStorage.setItem('stad', this.details.stad);
      localStorage.setItem('zipcode', this.details.zipcode);
      localStorage.setItem('mobile', this.details.mobile);
      document.getElementById('proceed').removeAttribute('disabled');
      this.router.navigate(['/account-payment-detaile']);
    } else {
      document.getElementById('proceed').removeAttribute('disabled');
    }
  }
}
