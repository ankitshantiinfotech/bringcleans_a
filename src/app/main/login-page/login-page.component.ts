import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [ AppGlobals]
})
export class LoginPageComponent implements OnInit {
  identityErr = '';
  passwordErr = '';
  resetpasMessageShow = true;
  resetOTP = '';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {
    window.scrollTo(0, 0);
    if (localStorage.getItem('postcode') && localStorage.getItem('uid')) { this.router.navigate(['/cleaners']); }
    if (!localStorage.getItem('access_token')) {
      const d = new Date();
      const time = d.getTime();
      const code = Math.floor(1000 + Math.random() * 9000);
      const deviceid = code + '-' + time;
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        device_id: deviceid,
        device_type: 0,
        api_key: 'cleaner@user#2',
        access: 'user'
      };
      this.auth.getToken(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          localStorage.clear();
          window.location.href = '/login';
        }
        localStorage.setItem('device_id', deviceid);
        localStorage.setItem('device_type', '0');
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('access', 'user');
      });
    } else {
      const sessionData = localStorage.getItem('access_token');
    }
  }

  ngOnInit() {
    if (localStorage.getItem('resetPassSucess')) {
      this.resetpasMessageShow = false;
      localStorage.removeItem('resetPassSucess');
    }

    setTimeout(() => {
      this.resetpasMessageShow = true;
    }, 3000);
  }

  login(data) {
    if (data.identity != '' && data.password != '') {
      var access_token = localStorage.getItem('access_token');
      var access = localStorage.getItem('access');
      var device_id = localStorage.getItem('device_id');
      var identity = data.identity;
      var sendData = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        access: access,
        device_id: device_id,
        access_token: access_token,
        api_key: 'cleaner@user#2',
        password: data.password,
        identity: identity,
        device_type: 0
      };
      this.auth.loginSrvs(sendData).subscribe((res: tokendata) => {
        if (res.status == 1) {
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('uid', res.data.id);
          localStorage.setItem('first_name', res.data.first_name);
          localStorage.setItem('last_name', res.data.last_name);
          localStorage.removeItem('registredEmail');
          if (res.data.access == 'user') {
            if (localStorage.getItem('selectedCleaners')) {
              this.router.navigate(['/bookstep-2']);
            } else {
              this.router.navigate(['/my-cleaner']);
            }
          }
          else if (res.data.access === 'cleaner') {
            if (res.account_verified == 0) {
              localStorage.setItem('registredEmail', data.identity);
              const dialogRef = this.dialog.open(
                EmailVerifyNotificationDialogONlogin
              );
              dialogRef.afterClosed().subscribe(result => {
                console.log(`Dialog result: ${result}`);
              });
              this.passwordErr = res.message;
            } else if (res.data.reg_step == 1) {
              this.router.navigate(['/reg-finish']);
            } else if (res.data.reg_step == 2){
              this.router.navigate(['/qwiz-page']);
            } else {
              if(res.data.admin_approve_status == '1') {
                this.router.navigate(['/offer']);
              } else {
                this.router.navigate(['/cleaner-account-detaile']);
              }
            }
          }
        } else {
          if (res.account_verified == 0) {
            localStorage.setItem('registredEmail', data.identity);
            const dialogRef = this.dialog.open(
              EmailVerifyNotificationDialogONlogin
            );
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
            this.passwordErr = res.message;
          } else if (res.message == 'Invalid email-id')
            this.identityErr = res.message;
          else this.passwordErr = res.message;
        }
      });
    } else {
      if (data.identity == '')
        this.identityErr = 'Ange en giltig e-post adress';
      if (data.password == '') this.passwordErr = 'Ange ditt lösenord';
    }
    setTimeout(() => {
      this.identityErr = '';
      this.passwordErr = '';
    }, 10000);
  }
}

@Component({
  selector: 'dialog-email-verify-notification',
  templateUrl: 'dialog-email-verify-notification.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [ AppGlobals]
})
export class EmailVerifyNotificationDialogONlogin {
  regEmail = '';
  acVerifyErr = '';
  resetOTP = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    public dialogRef: MatDialogRef<EmailVerifyNotificationDialogONlogin>,
    private baseUrl: AppGlobals
  ) {
    window.scrollTo(0, 0);
    this.regEmail = localStorage.getItem('registredEmail');
  }

  acVerify(data) {
    if (data.code != '') {
      var access_token = localStorage.getItem('access_token');
      var access = localStorage.getItem('access');
      var device_id = localStorage.getItem('device_id');
      var reg_email = localStorage.getItem('registredEmail');
      var sendData = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        access: access,
        device_id: device_id,
        access_token: access_token,
        api_key: 'cleaner@user#2',
        code: data.code,
        email: reg_email,
        device_type: '0'
      };
      this.auth.acVerifySrvs(sendData).subscribe((res: tokendata) => {
        console.log(res);
        if (res.status == 1) {
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('uid', res.data.id);
          localStorage.removeItem('registredEmail');
          document.getElementById('acVerifyClose').click();
          if (res.data.access == 'user') this.router.navigate(['/bookstep-2']);
          else if (res.data.access == 'cleaner') {
            if (res.data.reg_step == 1) this.router.navigate(['/reg-finish']);
            else if (res.data.reg_step == 2)
              this.router.navigate(['/qwiz-page']);
            else this.router.navigate(['/']);
          }
        } else {
          this.acVerifyErr = res.message;
        }
      });
    } else {
      if (data.code == '') this.acVerifyErr = 'Vänligen ange OTP-kod';
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
      this.resetOTP = res.message;
      setTimeout(() => {
        this.resetOTP = '';
      }, 3000);
    });
  }
}
