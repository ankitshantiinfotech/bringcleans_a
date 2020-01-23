import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-account-payment-detaile',
  templateUrl: './account-payment-detaile.component.html',
  styleUrls: ['./account-payment-detaile.component.scss'],
  providers: [ AppGlobals]
})
export class AccountPaymentDetaileComponent implements OnInit {
  frequency = '';
  duration = '';
  startdate: any = null;
  attime = '';
  priceperhour: any;
  sevicefee: any;
  cost: any;
  totalcost: any;
  carddetails: any = {
    cardholder: '',
    cardnumber: '',
    cardmonth: '',
    cardyear: '',
    cardcvv: ''
  };
  error = '';
  cardholErr = '';
  cardNumErr = '';
  cardCvvErr = '';
  cardMonErr = '';
  cardYearErr = '';

  showDiscountField = false;
  DiscountCode = '';
  DiscountCodeErr = '';
  discountAmount: any = 0;
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
    this.auth.processBookingSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
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
      if (localStorage.getItem('discountcode')) {
        this.showDiscountField = true;
        this.DiscountCode = localStorage.getItem('discountcode');
        this.discountAmount = parseFloat(localStorage.getItem('discountamount')).toFixed(2);
      }
    });
    this.auth.getCardSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.data.card_number) {

        this.carddetails.cardholder = res.data.card_holder;
        this.carddetails.cardnumber = res.data.card_number.substring(0, 4) + " " +
          res.data.card_number.substring(4, 8) + " " +
          res.data.card_number.substring(8, 12) + " " +
          res.data.card_number.substring(12, 16);
        this.carddetails.cardmonth = res.data.card_month.toString();
        this.carddetails.cardyear = res.data.card_year.toString();
      }
    });
  }
  showDiscountOpen() {
    if (this.showDiscountField) {
      this.showDiscountField = false;
    } else {
      this.showDiscountField = true;
    }
  }

  applyDiscountCode(){
    if (this.DiscountCode == '') {
       this.DiscountCodeErr = 'kod krävs';
    } else {
      this.DiscountCodeErr = '';
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        uid: localStorage.getItem('uid'),
        device_id: localStorage.getItem('device_id'),
        device_type: localStorage.getItem('device_type'),
        api_key: 'cleaner@user#2',
        access: localStorage.getItem('access'),
        access_token: localStorage.getItem('access_token'),
        code: this.DiscountCode
      };
      this.auth.checkDiscountCodeUrlSrvs(data).subscribe((res: tokendata) => {
        // apply coupan code
        if (res.status == 1) {
          this.discountAmount = parseFloat(res.data[0].amount).toFixed(2);
          localStorage.setItem('discountcode', this.DiscountCode);
          localStorage.setItem('discountamount', res.data[0].amount);
        } else {
          this.DiscountCodeErr = 'kod krävs';
        }
      });
    }
  }

  checkNum(e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  }
  cardnumber() {
    let len = this.carddetails.cardnumber.length;
    if (len == 4) {
      this.carddetails.cardnumber = this.carddetails.cardnumber + " ";
    }
    if (len == 9) {
      this.carddetails.cardnumber = this.carddetails.cardnumber + " ";
    }
    if (len == 14) {
      this.carddetails.cardnumber = this.carddetails.cardnumber + " ";
    }
  }
  finishbook() {
    document.getElementById('finish').setAttribute('disabled', 'disabled');
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
    const add1 = localStorage.getItem('address_1');
    const add2 = localStorage.getItem('address_2');
    const stadv = localStorage.getItem('stad');
    const mob = localStorage.getItem('mobile');
    if (this.carddetails.cardholder === '') { this.cardholErr = 'Kortinnehavarens namn krävs.'; } else {
      this.cardholErr = ''; }
    if (this.carddetails.cardnumber === '') { this.cardNumErr = 'Kortnamn krävs.'; } else {
      this.cardNumErr = ''; }
    if (this.carddetails.cardcvv === '') { this.cardCvvErr = 'kort cvv krävs.'; } else {
      this.cardCvvErr = ''; }
    if (this.carddetails.cardmonth === '') { this.cardMonErr = 'Utgångsmånad krävs.'; } else {
      this.cardMonErr = ''; }
    if (this.carddetails.cardyear === '') { this.cardYearErr = 'Utgångsår krävs.'; } else {
      this.cardYearErr = ''; }
    if (
      this.carddetails.cardholder !== '' &&
      this.carddetails.cardnumber !== '' &&
      this.carddetails.cardcvv !== '' &&
      this.carddetails.cardmonth !== '' &&
      this.carddetails.cardyear !== ''
    ) {
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
        cleaners: JSON.parse(cleanersIds).join(),
        address_1: add1,
        address_2 : add2,
        stad: stadv,
        mobile: mob,
        card_name: this.carddetails.cardholder,
        number: this.carddetails.cardnumber.split(" ")[0] + this.carddetails.cardnumber.split(" ")[1] + this.carddetails.cardnumber.split(" ")[2] + this.carddetails.cardnumber.split(" ")[3],
        cvv: this.carddetails.cardcvv,
        month: this.carddetails.cardmonth,
        year: this.carddetails.cardyear,
        remember: '0',
        discount_code: this.DiscountCode,
        discount_amount: this.discountAmount
      };
      this.auth.updateCardSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.error = 'Session timeout logging out.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status) {
          this.auth.confirmBookSrvs(data).subscribe((res2: tokendata) => {
            console.log(res2);
            if (res2.status) {
              this.router.navigate(['/request-send']);
            } else {
              if (res2.message != null) {
                this.error = res2.message;
              } else {
                this.error = res2.error;
              }
              document.getElementById('finish').removeAttribute('disabled');
            }
          });
        } else {
          this.error = res.message;
          document.getElementById('finish').removeAttribute('disabled');
        }
      });
    } else {
      document.getElementById('finish').removeAttribute('disabled');
    }
  }
}
