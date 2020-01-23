import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  providers: [ AppGlobals]
})
export class AccountDetailComponent implements OnInit {
  fnameErr = '';
  lnameErr = '';
  emailErr = '';
  passwordErr = '';
  confirmpasswordErr
  userDate: any = {
    first: '',
    last: '',
    email: '',
    pid: '',
    password: '',
    confirmpassword:''
  };
  acVerifyErr = '';
  tncErr = '';
  regEmail = '';
  serverErr = '';
  theCheckbox2 = false;
  frequency = '';
  duration = '';
  startdate: any = null;
  attime: any;
  priceperhour: any;
  sevicefee: any;
  cost: any;
  totalcost: any;
  pidErr = '';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);}
  checkformat(e) {
    const pidcheck = /^([0-9]{6})+\-([0-9]{4})$/;
    if (pidcheck.test(this.userDate.pid) === false) {
      this.pidErr = 'Ange giltigt personligt ID-nummer.';
    } else {
      this.pidErr = '';
    }
  }
  checkNum(e) {
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  }
  adddash(e) {
    if (this.userDate.pid.length === 6) {
      this.userDate.pid = this.userDate.pid + '-';
    }
  }
  ngOnInit() {
    if (localStorage.getItem('uid')) {
      this.router.navigate(['/cleaners']);
    }
    const accesstoken = localStorage.getItem('access_token');
    const accessUser = localStorage.getItem('access');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
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
      device_id: deviceid,
      device_type: devicetype,
      api_keyL: 'cleaner@user#2',
      access: accessUser,
      access_token: accesstoken,
      uid: '',
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
        'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
         'Juli', 'augusti', 'september', 'oktober', 'november', 'december'
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

  EmailVerifyNotification() {
    const dialogRef = this.dialog.open(EmailVerifyNotificationDialog);
    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
    });
  }

  userReg() {
    document.getElementById('register').setAttribute('disabled', 'disabled');
    const pidcheck = /^([0-9]{6})+\-([0-9]{4})$/;
    if (pidcheck.test(this.userDate.pid) === false) {
      this.pidErr = 'Ange endast numeriskt värde.';
    } else {
      this.pidErr = '';
    }
    if (
      this.userDate.first.trim() !== ''
      && this.userDate.last.trim() !== ''
      && this.userDate.email.trim() !== ''
      && this.userDate.password.trim() !== ''
      && this.userDate.confirmpassword.trim() !== ''
      && this.userDate.pid !== ''
      && pidcheck.test(this.userDate.pid) === true
      && this.theCheckbox2 === true
      ) {
        const emailcheck = this.ValidateEmail(this.userDate.email);
        if (emailcheck === true) {
          if (this.userDate.password.length >= 6) {
                 if(this.userDate.password==this.userDate.confirmpassword){
                  this.confirmpasswordErr = '';
                  const sendData = {
                    base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
                    access: 'user',
                    first_name: this.userDate.first,
                    api_key: 'cleaner@user#2',
                    last_name: this.userDate.last,
                    email: this.userDate.email,
                    password: this.userDate.password,
                    personal_id_number: this.userDate.pid
                  };
                  this.auth.userRegSrvs(sendData).subscribe((res: tokendata) => {
                    if (res.status == '2') {
                      this.serverErr = 'Session timeout logging out.';
                      localStorage.clear();
                      window.location.href = '/login';
                    }
                    if (res.status === 1) {
                      this.fnameErr = '';
                      this.lnameErr = '';
                      this.emailErr = '';
                      this.passwordErr = '';
                      this.confirmpasswordErr = '';
                      this.tncErr = '';
                      this.serverErr = '';
                      this.regEmail = this.userDate.email;
                      localStorage.setItem('registredEmail', this.userDate.email);
                      localStorage.setItem('first_name', this.userDate.first);
                      localStorage.setItem('last_name', this.userDate.last);
                      const dialogRef = this.dialog.open(EmailVerifyNotificationDialog);
                      dialogRef.afterClosed().subscribe(result => {
                        console.log(`Dialog result: ${result}`);
                      });
                    } else {
                      this.serverErr = '';
                      if (res.status === 0 && res.message === 'This email is already exist.') {
                        if (res.account_verified === 0) {
                          this.regEmail = this.userDate.email;
                          localStorage.setItem('registredEmail', this.userDate.email);
                          const dialogRef = this.dialog.open(EmailVerifyNotificationDialog);
                          dialogRef.afterClosed().subscribe(result => {
                            console.log(`Dialog result: ${result}`);
                          });
                        } else {
                          document.getElementById('register').removeAttribute('disabled');
                          this.emailErr = 'Det här e-postmeddelandet finns redan';
                        }
                      } else {
                        document.getElementById('register').removeAttribute('disabled');
                        this.serverErr = res.message;
                      }
                    }
                  });
              }else {
                document.getElementById('register').removeAttribute('disabled');
                this.confirmpasswordErr = 'lösenordet stämmer inte';
                setTimeout(() => {  this.confirmpasswordErr = '';}, 10000);
              }
          } else {
            document.getElementById('register').removeAttribute('disabled');
            this.passwordErr = 'Lösenordet måste vara minst sex tecken långt';
            setTimeout(() => {  this.passwordErr = '';}, 10000);
          }
        } else {
          document.getElementById('register').removeAttribute('disabled');
          this.emailErr = 'E-post krävs'; //Please enter a valid email
        }
      } else {
        if (this.userDate.first.trim() === '') {
          document.getElementById('register').removeAttribute('disabled');
          this.fnameErr = 'Förnamn krävs';
        }
        if (this.userDate.last.trim() === '') {
          document.getElementById('register').removeAttribute('disabled');
          this.lnameErr = ' Efternamn krävs';
        }
        if (this.userDate.email.trim() === '') {
          document.getElementById('register').removeAttribute('disabled');
          this.emailErr = 'E-post krävs';
        }
        if (this.userDate.password.trim() === '') {
          document.getElementById('register').removeAttribute('disabled');
          this.passwordErr = 'Lösenord krävs';
        }
        if (this.userDate.confirmpassword.trim() === '') {


          document.getElementById('register').removeAttribute('disabled');
          this.confirmpasswordErr = 'Bekräfta lösenord som krävs';
        }
        if (this.userDate.pid === '') {
          document.getElementById('register').removeAttribute('disabled');
          this.pidErr = 'Ange Personnummer.'; // Please enter your personal id
        }
        if (this.theCheckbox2 === false) {
          document.getElementById('register').removeAttribute('disabled');
          this.tncErr = 'Du måste acceptera villkoren för att kunna fortsätta'; // Please accept Term & Conditions
        }
        setTimeout(() => {
          this.fnameErr = '';
          this.lnameErr = '';
          this.emailErr = '';
          this.passwordErr = '';
          this.confirmpasswordErr = '';
          this.tncErr = '';
        }, 10000);
      }
    }
  ValidateEmail(inputText) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      document.getElementById('register').removeAttribute('disabled');
      return false;
    }
  }
}


@Component({
  selector: 'dialog-email-verify-notification',
  templateUrl: 'dialog-email-verify-notification.html',
  styleUrls: ['./account-detail.component.scss'],
  providers: [ AppGlobals]
})
export class EmailVerifyNotificationDialog {
    regEmail = '';
    acVerifyErr = '';
    resetOTP = '';
  constructor(
    private router: Router, private auth: AuthService,
    public dialogRef: MatDialogRef<EmailVerifyNotificationDialog>,
    private baseUrl: AppGlobals
    ) {
      this.regEmail = localStorage.getItem('registredEmail');
    }

  acVerify(data) {
    document.getElementById('verify').setAttribute('disabled', 'disabled');
    if (data.code !== '') {
          const accessToken = localStorage.getItem('access_token');
          const accesse = localStorage.getItem('access');
          const deviceId = localStorage.getItem('device_id');
          const regEmail = localStorage.getItem('registredEmail');
          const sendData = {
            base_url_server: this.baseUrl.baseAppUrl,
            base_url_client: this.baseUrl.baseAppUrlC,
            access: accesse,
            device_id: deviceId,
            access_token: accessToken,
            api_key: 'cleaner@user#2',
            code: data.code,
            email: regEmail,
            device_type: '0'
          }
          this.auth.acVerifySrvs(sendData).subscribe((res: tokendata) => {
            if (res.status == '2') {
              this.acVerifyErr = 'Session timeout logging out.';
              localStorage.clear();
              window.location.href = '/login';
            }
            if (res.status === 1) {
                localStorage.setItem('access', res.data.access);
                localStorage.setItem('uid', res.data.id);
                localStorage.removeItem('registredEmail');
                document.getElementById('acVerifyClose').click();
                if(res.data.access == 'user') {
                    this.router.navigate(['/bookstep-2']);
                } else if(res.data.access == 'cleaner') {
                  if (res.data.reg_step == 1) {
                    this.router.navigate(['/reg-finish']);
                  } else if (res.data.reg_step == 2) {
                    this.router.navigate(['/qwiz-page']);
                  } else {
                    this.router.navigate(['/']); }
                }
            } else {
              document.getElementById('verify').removeAttribute('disabled');
              this.acVerifyErr = res.message;
            }
      });

    } else {
      document.getElementById('verify').removeAttribute('disabled');
      if (data.code =='') { this.acVerifyErr = 'Vänligen ange OTP-kod'; }
    }
    setTimeout(() => {
      this.acVerifyErr = '';
    }, 10000);
  }
  resendotp() {
    const identityUser = localStorage.getItem('registredEmail');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
      base_url_client: this.baseUrl.baseAppUrlC,
      api_key: 'cleaner@user#2',
      identity: identityUser,
      otp_for: 'ac_activation'
    };
    this.auth.resendOtpSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.acVerifyErr = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      this.resetOTP = res.message;
      setTimeout(() => {
        this.resetOTP = '';
      }, 3000);
    });
  }

}
