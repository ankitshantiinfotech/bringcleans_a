import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { isNumber } from 'util';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [ AppGlobals]
})
export class RegisterPageComponent implements OnInit {
  emailErr = '';
  firstErr = '';
  lastErr = '';
  phoneErr = '';
  passwordErr = '';
  confirmErr = '';
  accept = false;
  acceptErr = '';
  error = '';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);}

  ngOnInit() {
    if (localStorage.getItem('uid')) {
      if (localStorage.getItem('access') == 'user') {
        this.router.navigate(['/my-cleaner']);
      } else {
        this.router.navigate(['/offer']);
      }
    }
  }
  enter(e) {
    if (e.keyCode === 13) {
      document.getElementById('reg').click();
    }
  }
  checkPhone(e) {
    console.log(e.keyCode);
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  }
  termsClick(event) {
    this.accept = !this.accept;
    if(this.accept)this.acceptErr = '';
    else this.acceptErr = 'Du måste acceptera villkoren för att kunna fortsätta';
  }
   
  RemoveErr(name){
     if(name=='email')this.emailErr = '';
     if(name=='fname')this.firstErr = '';
     if(name=='lname')this.lastErr = '';
     if(name=='phone')this.phoneErr = '';
     if(name=='password')this.passwordErr = '';
     if(name=='confirm')this.confirmErr = '';
  }


  regCleaner(cleanerData) {
    const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const regMob = /^\d+$/;
    const firstTwo = cleanerData.phone.substring(0,2);
    // email validation
    if (cleanerData.email === '') {
      this.emailErr = 'E-post krävs.';
    } else {
      if (regEmail.test(cleanerData.email) == false) {
        this.emailErr = 'Ogiltig e-post.';
      } else {
        this.emailErr = '';
      }
    }
    // firstname validation
    if (cleanerData.fname === '') {
      this.firstErr = 'Förnamn krävs.';
    } else {
      this.firstErr = '';
    }
    // lastname validation
    if (cleanerData.lname === '') {
      this.lastErr = 'Efternamn krävs.';
    } else {
      this.lastErr = '';
    }
    // phone Validation
    let lenP = parseInt(cleanerData.phone.length);
    if (cleanerData.phone === '') {
      this.phoneErr = 'Mobilnummer krävs.';
    } else {
      if (lenP <= 9) {
        this.phoneErr = 'Telefonnummer måste vara 10 nummer långt.';
      } else {
        if (regMob.test(cleanerData.phone) === true) {
          if(firstTwo != '07') {
            this.phoneErr = 'Mobilnumret måste börja med 07.';
          } else { this.phoneErr = ''; }
        } else { this.phoneErr = 'Ogiltigt telefonnummer.'; }
        // if (!regMob.test(cleanerData.phone)) { this.phoneErr = 'Phone number must be 8e numbers long.'; }
        // else {  }
      }
    }
    // password validation
    var len = parseInt(cleanerData.password.length);
    if (cleanerData.password === '') {
      this.passwordErr = 'Lösenord krävs.';
    } else {
      if (len <= 5) {
        this.passwordErr = 'Lösenordet måste vara minst sex tecken långt.';
      } else {
        this.passwordErr = '';
      }
    }
    // confirm validation
    if (cleanerData.confirm === '') {
      this.confirmErr = 'Bekräfta lösenord krävs.';
    } else {
      if (cleanerData.confirm !== cleanerData.password) {
        this.confirmErr = 'Lösenorden matchar inte.';
      } else {
        this.confirmErr = '';
      }
    }
    if (!this.accept) {
      this.acceptErr = 'Du måste acceptera villkoren för att kunna fortsätta';
    } else {
      this.acceptErr = '';
    }
    // register if all good
    if (
      cleanerData.email !== '' &&
      regEmail.test(cleanerData.email) == true &&
      cleanerData.fname !== '' &&
      cleanerData.lname !== '' &&
      cleanerData.phone !== '' &&
      regMob.test(cleanerData.phone) === true &&
      lenP >= 10 &&
      cleanerData.password !== '' &&
      len >= 6 &&
      cleanerData.confirm !== '' &&
      cleanerData.confirm === cleanerData.password &&
      firstTwo == '07' &&
      this.accept
    ) {
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        api_key: 'coach@user#2',
        first_name: cleanerData.fname,
        last_name: cleanerData.lname,
        email: cleanerData.email,
        mobile: cleanerData.phone,
        password: cleanerData.password,
        confirm_password: cleanerData.confirm
      };
      //console.log(data);
      this.auth.regCleanerSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.error = 'Session timeout.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status) {
          localStorage.setItem('reg_uid', res.uid);
          localStorage.setItem('registredEmail', cleanerData.email);
          localStorage.setItem('first_name', cleanerData.fname);
          localStorage.setItem('last_name', cleanerData.lname);
          const dialogRef = this.dialog.open(
            CleanerRegVerifyNotificationDialog
          );
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        } else {
          if (
            res.status === 0 &&
            res.message === 'This email is already exist.'
          ) {

            if(res.account_verified==0)
            {
               localStorage.setItem('registredEmail',data.email);
               const dialogRef = this.dialog.open(CleanerRegVerifyNotificationDialog);

               dialogRef.afterClosed().subscribe(result => {
                   console.log(`Dialog result: ${result}`);
               });
            }
            else
                this.emailErr= res.message;

          } else {
            this.error = res.message;
          }
        }
      });
    } else {
      console.log('ela');

    }
  }
}

@Component({
  selector: 'dialog-email-verify-notification',
  templateUrl: 'dialog-email-verify-notification.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [ AppGlobals]
})
export class CleanerRegVerifyNotificationDialog {
  regEmail = '';
  acVerifyErr = '';
  resetOTP = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    public dialogRef: MatDialogRef<CleanerRegVerifyNotificationDialog>,
    private baseUrl: AppGlobals
  ) {
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
        if (res.status == '2') {
          this.acVerifyErr = 'Session timeout.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status == 1) {
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('reg_uid', res.data.id);
          localStorage.removeItem('registredEmail');
          document.getElementById('acVerifyClose').click();
          this.router.navigate(['/reg-finish']);
        } else {
          this.acVerifyErr = res.message;
        }
      });
    } else {
      if (data.code == '') this.acVerifyErr = 'Ange verifieringskoden';
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
        this.acVerifyErr = 'Session timeout.';
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
