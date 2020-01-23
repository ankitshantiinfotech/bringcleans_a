import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';


@Component({
  selector: 'app-account-detaile-changing',
  templateUrl: './account-detaile-changing.component.html',
  styleUrls: ['./account-detaile-changing.component.scss'],
  providers: [AppGlobals]
})
export class AccountDetaileChangingComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public options: Options;
  profile: any = {
    fname: '',
    lname: '',
    phone: '',
    landline: '',
    email: '',
    newPass: '',
    confirmPass: '',
    oldPass: '',
    pid: ''
  };
  fnameErr = '';
  lnameErr = '';
  phoneErr = '';
  emailErr = '';
  oldpassErr = '';
  newpassErr = '';
  confPassErr = '';
  theCheckbox1 = true;
  successMsg = '';
  errMsg = '';
  success = true;
  error = true;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
    ) {
      window.scrollTo(0, 0);
    }
  enter(e) {
    if (e.keyCode === 13) {
      document.getElementById('update').click();
    }
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
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.data.email_booking_reminder === 1) {
        this.theCheckbox1 = true;
      }
      this.profile.fname = res.data.first_name;
      this.profile.lname = res.data.last_name;
      this.profile.phone = res.data.mobile;
      this.profile.landline = res.data.landline;
      this.profile.email = res.data.email;
      this.profile.pid = res.data.personal_id_number;
    });
    this.exampleData = [
      {
        id: 'opt1',
        text: 'Options 1'
      },
      {
        id: 'opt2',
        text: 'Options 2'
      },
      {
        id: 'opt3',
        text: 'Options 3'
      },
      {
        id: 'opt4',
        text: 'Options 4'
      }
    ];
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,

    };
  }
  openDialogDash2() {
      const dialogRef = this.dialog.open(UpdateCardDetaileModal);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  openDialogDash3() {
    const dialogRef = this.dialog.open(ChangingWichCleanderModal);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  updateProfile() {
    const firstTwo = this.profile.phone.substring(0,2);
    if (this.profile.fname === '') { this.fnameErr = 'Förnamn krävs.'; } else { this.fnameErr = ''; }
    if (this.profile.lname === '') { this.lnameErr = 'Efternamn krävs.'; } else { this.lnameErr = ''; }
    if (this.profile.email === '') { this.emailErr = 'E-post krävs'; } else { this.emailErr = ''; }
    if (this.profile.oldPass === '') { this.oldpassErr = 'Ange lösenord för att fortsätta.'; } else { this.oldpassErr = ''; }
    if (this.profile.phone === '') { this.phoneErr = 'Telefonnummer krävs.';
    } else {
      if (this.profile.phone.length < 10) { this.phoneErr = 'Phone Number must be 10 numbers long.';
      } else {
        if (firstTwo != '07') {
          this.phoneErr = 'Mobilnumret måste börja med 07.';
        } else { this.phoneErr = ''; }
      }
    }
    if (this.profile.newPass !== '') {
      if (this.profile.newPass.length < 6) {
        this.newpassErr = 'Password must be 6 characters long.';
        this.confPassErr = '';
        this.profile.newPass = '';
        this.profile.confirmPass = '';
        return false;
      } else if (this.profile.newPass !== this.profile.confirmPass) {
        this.newpassErr = '';
        this.confPassErr = 'Password does not match.';
        this.profile.confirmPass = '';
        return false;
      } else {
        this.newpassErr = '';
        this.confPassErr = '';
      }
    }
    if (
      this.profile.fname !== '' &&
      this.profile.lname !== '' &&
      this.profile.phone !== '' &&
      this.profile.email !== '' &&
      this.profile.oldPass !== '' &&
      this.profile.phone.length >= 10 &&
      firstTwo == '07'
    ) {
      const user = localStorage.getItem('uid');
      const accessToken = localStorage.getItem('access_token');
      const deviceId = localStorage.getItem('device_id');
      const deviceType = localStorage.getItem('device_type');
      const accessI = localStorage.getItem('access');
      let emailrem = 0;
      if (this.theCheckbox1 === true) {
        emailrem = 1;
      }
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        device_id: deviceId,
        device_type: deviceType,
        api_key: 'cleaner@user#2',
        access: accessI,
        access_token: accessToken,
        uid: user,
        first_name: this.profile.fname,
        last_name: this.profile.lname,
        mobile: this.profile.phone,
        landline: this.profile.landline,
        email_booking_reminder: emailrem,
        current_password: this.profile.oldPass,
        new_password: this.profile.newPass,
        confirm_password: this.profile.confirmPass
      };
      this.auth.updateUserProfileSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.errMsg = 'Session timeout logging out.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status) {
          this.successMsg = res.message;
          this.success = false;
          this.profile.oldPass = '';
          this.profile.newPass = '';
          this.profile.confirmPass = '';
          localStorage.setItem('first_name', this.profile.fname);
          localStorage.setItem('last_name', this.profile.lname);
          setTimeout(() => {
            this.successMsg = '';
            this.success = true;
          }, 3000);
          window.scrollTo(0, 0);
        } else {
          if (res.status === 0 && res.message === 'current password is incorrect') {
            this.oldpassErr = res.message;
          } else {
            this.errMsg = res.message;
            this.error = false;
            setTimeout(() => {
              this.errMsg = '';
              this.error = true;
            }, 3000);
            window.scrollTo(0, 0);
          }
        }
      });
    }
  }
  checkPhone(e) { if (e.keyCode < 48 || e.keyCode > 57) { e.preventDefault(); } }
}
@Component({
  selector: 'account-detaile-changing',
  templateUrl: 'account-detaile-changing-popup.html',
  styleUrls: ['./account-detaile-changing.component.scss'],
  providers: [AppGlobals]

})
export class UpdateCardDetaileModal {
  email = '';
  selectedmonth = '0';
  selectedYear = '0';
  carddet: any = {
    cardnumber: '',
    cvv: '',
    month: '',
    year: ''
  };
  theCheckbox1 = false;
  rememberval = 0;
  cardErr = '';
  cvvErr = '';
  monthErr = '';
  YearErr = '';
  constructor(
    public dialogRef: MatDialogRef<UpdateCardDetaileModal>,
    private router: Router, private auth: AuthService, private baseUrl: AppGlobals
    ) {
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
      this.auth.getCardSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          localStorage.clear();
          window.location.href = '/login';
        }
        this.email = res.email;
        if (res.data.card_number) {
          this.carddet.cardnumber = res.data.card_number;
          this.carddet.month = res.data.card_month;
          this.carddet.year = res.data.card_year;
          if (res.data.remember_me === 1) { this.theCheckbox1 = true; }
        }
      });
    }
    updatecard() {
      const regNum = /^\d+$/;
      const user = localStorage.getItem('uid');
      const accessToken = localStorage.getItem('access_token');
      const deviceId = localStorage.getItem('device_id');
      const deviceType = localStorage.getItem('device_type');
      const accessI = localStorage.getItem('access');
      if (this.theCheckbox1 === true) { this.rememberval = 1; }
      if (this.carddet.cardnumber === '') { this.cardErr = 'Kortnummer krävs'; } else {
        if (this.carddet.cardnumber.length == 16) {
          if (regNum.test(this.carddet.cardnumber) === false) { this.cardErr = 'Kortnummer måste endast vara nummer.';
        } else { this.cardErr = ''; }
        } else { this.cardErr = 'Kortnumret ska vara 16 nummer långt.'; }
      }
      if (this.carddet.cvv === '') { this.cvvErr = 'CVV krävs'; } else {
        if (this.carddet.cvv.length == 3) {
          if (regNum.test(this.carddet.cvv) === false) { this.cvvErr = 'CVV måste endast vara nummer.';
          } else { this.cvvErr = ''; }
        } else { this.cvvErr = 'CVV bör vara tre siffror långa.'; }
      }
      if (this.carddet.month === '') { this.monthErr = 'Ange exp. månad för att fortsätta.'; } else {
        if (this.carddet.month.length == 2) {
          if (regNum.test(this.carddet.month) === false) {
            this.monthErr = 'Exp. månad måste endast vara nummer.';
          } else { this.monthErr = ''; }
        } else { this.monthErr = 'Exp. månad bör vara två siffror långa.'; }
      }
      if (this.carddet.year === '') { this.YearErr = 'Ange exp. året för att fortsätta.'; } else {
        if (this.carddet.year.length == 4) {
          if (regNum.test(this.carddet.year) === false) {
            this.YearErr = 'Exp. år måste endast vara siffror.';
          } else { this.YearErr = ''; }
        } else { this.YearErr = 'Exp. året ska vara 4 siffror långt.'; }
      }
      if (
        this.carddet.cardnumber !== ''
        && this.carddet.cardnumber.length == 16
        && regNum.test(this.carddet.cardnumber) === true
        && this.carddet.cvv !== ''
        && this.carddet.cvv.length == 3
        && regNum.test(this.carddet.cvv) === true
        && this.carddet.month !== ''
        && this.carddet.month.length == 2
        && regNum.test(this.carddet.month) === true
        && this.carddet.year !== ''
        && this.carddet.year.length == 4
        && regNum.test(this.carddet.year) === true
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
        number: this.carddet.cardnumber,
        cvv: this.carddet.cvv,
        month: this.carddet.month,
        year: this.carddet.year,
        remember: this.rememberval
      };
      this.auth.updateCardSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status) {
          document.getElementById('close').click();
        }
      });
    }
    }
}
@Component({
  selector: 'account-detaile-changing',
  templateUrl: 'account-detaile-changing-wich-cleaner-popup.html',
  styleUrls: ['./account-detaile-changing.component.scss'],
  providers: [AppGlobals]
})
export class ChangingWichCleanderModal {
  constructor(
    public dialogRef: MatDialogRef<ChangingWichCleanderModal>,
    ) { }
}
