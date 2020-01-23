import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata} from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-mypayout',
  templateUrl: './mypayout.component.html',
  styleUrls: ['./mypayout.component.scss'],
  providers: [ AppGlobals]
})
export class MypayoutComponent implements OnInit {
  variable = 0;
  name = '';
  rating = 0;
  cleansdone = 0;
  srvsfee = 0;
  srvsType = '';
  cleanerimage = false;
  payouts: any = {
    recurringPay: 95,
    oneoffPay: 95,
    clientrecurringPay: 0,
    clientoneoffPay: 0
  };
  profileFile: File = null;
  profileSrc = 'assets/images/round-img4.png';
  success = true;
  error = true;
  successMsg = '';
  errMsg = '';
  constructor(private router: Router, private auth: AuthService, private baseUrl: AppGlobals) { window.scrollTo(0, 0);}
  precise(x, precision) {
    const y = +x + (precision === undefined ? 0.5 : precision / 2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }
  ngOnInit() {
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: 'cleaner@user#2',
      access: accessI,
      access_token: accessToken
    };
    this.auth.getUserSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      this.name = res.data.first_name + ' ' + res.data.last_name;
      this.rating = res.data.rating;
      this.cleansdone = res.data.cleaning_done;
      if (res.data.my_recurring_hr_payout < 95) { this.payouts.recurringPay = 95; }
      else { this.payouts.recurringPay = res.data.my_recurring_hr_payout; }
      if (res.data.my_onetime_hr_payout < 95) { this.payouts.oneoffPay = 95; }
      else { this.payouts.oneoffPay = res.data.my_onetime_hr_payout; }
      if (res.data.profile_pic !== '') {
        this.profileSrc = this.baseUrl.baseAppUrl + 'uploads/profile_pic/' + res.data.profile_pic;
        this.cleanerimage = true;
      }
    });
    const data2 = { type: 'payout_service_fee' };
    this.auth.getSrvsFeeSrvs(data2).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      this.srvsfee = res.data.amount;
      this.srvsType = res.data.amount_type;
      if (this.srvsType === 'percent') {
        this.payouts.clientrecurringPay = Math.ceil(this.payouts.recurringPay + (this.payouts.recurringPay * this.srvsfee / 100));
        this.payouts.clientoneoffPay = Math.ceil(this.payouts.oneoffPay + (this.payouts.oneoffPay * this.srvsfee / 100));
      } else {
        this.payouts.clientrecurringPay = Math.ceil(this.payouts.recurringPay + this.srvsfee);
        this.payouts.clientoneoffPay = Math.ceil(this.payouts.oneoffPay + this.srvsfee);
      }
    });
  }
  addrecurring() {
    this.payouts.recurringPay++;
    if (this.payouts.recurringPay < 95) { this.payouts.recurringPay = 95; }
    if (this.srvsType === 'percent') {
      this.payouts.clientrecurringPay = Math.ceil(this.payouts.recurringPay + (this.payouts.recurringPay * this.srvsfee / 100));
    } else {
      this.payouts.clientrecurringPay = Math.ceil((this.payouts.recurringPay + this.srvsfee));
    }
  }
  checkRecuring() {
    if (this.payouts.recurringPay < 95) { this.payouts.recurringPay = 95; }
    if (this.srvsType === 'percent') {
      this.payouts.clientrecurringPay = Math.ceil(this.payouts.recurringPay + (this.payouts.recurringPay * this.srvsfee / 100));
    } else {
      this.payouts.clientrecurringPay = Math.ceil((this.payouts.recurringPay + this.srvsfee));
    }
  }
  remrecurring() {
    this.payouts.recurringPay--;
    if (this.payouts.recurringPay < 95) { this.payouts.recurringPay = 95; }
    if (this.srvsType === 'percent') {
      this.payouts.clientrecurringPay = Math.ceil(this.payouts.recurringPay + (this.payouts.recurringPay * this.srvsfee / 100));
    } else {
      this.payouts.clientrecurringPay = Math.ceil(this.payouts.recurringPay + this.srvsfee);
    }
  }

  addoneoff() {
    this.payouts.oneoffPay++;
    if (this.payouts.oneoffPay < 95 ) { this.payouts.oneoffPay = 95; }
    if (this.srvsType === 'percent') {
      this.payouts.clientoneoffPay = Math.ceil(this.payouts.oneoffPay + (this.payouts.oneoffPay * this.srvsfee / 100));
    } else {
      this.payouts.clientoneoffPay = Math.ceil(this.payouts.oneoffPay + this.srvsfee);
    }
  }
  checkonce() {
    if (this.payouts.oneoffPay < 95 ) { this.payouts.oneoffPay = 95; }
    if (this.srvsType === 'percent') {
      this.payouts.clientoneoffPay = Math.ceil(this.payouts.oneoffPay + (this.payouts.oneoffPay * this.srvsfee / 100));
    } else {
      this.payouts.clientoneoffPay = Math.ceil(this.payouts.oneoffPay + this.srvsfee);
    }
  }
  remoneoff() {
    this.payouts.oneoffPay--;
    if (this.payouts.oneoffPay < 95) { this.payouts.oneoffPay = 95; }
    if (this.srvsType === 'percent') {
      this.payouts.clientoneoffPay = Math.ceil(this.payouts.oneoffPay + (this.payouts.oneoffPay * this.srvsfee / 100));
    } else {
      this.payouts.clientoneoffPay = Math.ceil(this.payouts.oneoffPay + this.srvsfee);
    }
  }
  savePayouts() {
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const dataPayout = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: 'cleaner@user#2',
      access: accessI,
      access_token: accessToken,
      my_recurring_hr_payout: this.payouts.recurringPay,
      my_onetime_hr_payout: this.payouts.oneoffPay,
      client_recurring_hr_payout: this.payouts.clientrecurringPay,
      client_onetime_hr_payout: this.payouts.clientoneoffPay
    };
    // if (this.cleanerimage == true) {
    this.auth.updateCleanerPayoutSrvs(dataPayout).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.status) {
        this.successMsg = res.message;
        this.success = false;
        setTimeout(() => {
          this.successMsg = '';
          this.success = true;
        }, 3000);
      } else {
        this.errMsg = res.message;
        this.error = false;
        setTimeout(() => {
          this.errMsg = '';
          this.error = true;
        }, 3000);
      }
      window.scrollTo(0, 0);
    });
   /* } else {
      this.errMsg = 'Profilbild är obligatoriskt.';
      this.error = false;
      setTimeout(() => {
        this.errMsg = '';
        this.error = true;
      }, 3000);
      window.scrollTo(0, 0);
    }*/
  }
  profilePic(event) {
    this.profileFile = event.target.files[0];
    const ext = event.target.files[0].name.split('.')[1];
    if (
      ext === 'png' ||
      ext === 'PNG' ||
      ext === 'jpg' ||
      ext === 'JPG' ||
      ext === 'jpeg' ||
      ext === 'JPEG'
    ) {
      const fd = new FormData();
      const user = localStorage.getItem('uid');
      const deviceid = localStorage.getItem('device_id');
      const devicetype = localStorage.getItem('device_type');
      const apikey = 'cleaner@user#2';
      const accesstoken = localStorage.getItem('access_token');
      const access = localStorage.getItem('access');
      fd.append('base_url_server', this.baseUrl.baseAppUrl);
      fd.append('base_url_client', this.baseUrl.baseAppUrlC);

      fd.append('device_id', deviceid);
      fd.append('device_type', devicetype);
      fd.append('api_key', apikey);
      fd.append('access', access);
      fd.append('access_token', accesstoken);
      fd.append('uid', user);
      fd.append('profile_pic', this.profileFile);
      this.auth.updateCleanerProfileSrvs(fd).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.errMsg = 'Session timeout logging out.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status === 1) {
          this.profileSrc = this.baseUrl.baseAppUrl + 'uploads/profile_pic/' + res.profile_pic;
          this.successMsg = res.message;
          this.success = false;
          this.cleanerimage = true;
          setTimeout(() => {
            this.successMsg = '';
            this.success = true;
          }, 3000);
        } else {
          this.errMsg = res.message;
          this.error = false;
          setTimeout(() => {
            this.errMsg = '';
            this.error = true;
          }, 3000);
        }
        window.scrollTo(0, 0);
      });
    } else {
      this.errMsg = '“Filformatet stöds inte.';
      this.error = false;
      setTimeout(() => {
        this.errMsg = '';
        this.error = true;
      }, 3000);
      window.scrollTo(0, 0);
    }
  }
  removePrif() {
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const accessk = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceid,
      device_type: devicetype,
      api_key: apikey,
      access: accessk,
      access_token: accesstoken,
      document_type: 'profile_pic'
    };
    this.auth.documentDeleteSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      this.cleanerimage = false;
      this.profileFile = null;
      this.profileSrc = 'assets/images/round-img4.png';
      this.errMsg = 'Profilbilden är obligatorisk.';
      this.error = false;
      setTimeout(() => {
        this.errMsg = '';
        this.error = true;
      }, 3000);
      window.scrollTo(0, 0);
    });
  }
}
