import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-reg-finish',
  templateUrl: './reg-finish.component.html',
  styleUrls: ['./reg-finish.component.scss'],
  providers: [ AppGlobals]
})

export class RegFinishComponent implements OnInit {

  public genderdata: Array<Select2OptionData>;
  public options: Options;

  unlogged = true;
  genderErr = '';
  companyErr = '';
  organizationErr = '';
  pidErr = '';
  addressErr = '';
  cityErr = '';
  zipErr = '';
  error = '';
  company = '';
  orgnumber = '';
  pidnumber = '';
  addressinp = '';
  additionalInp = '';
  city = '';
  postal = '';
  range = [];
  years: any = null;
  profiler: any = {
    company : '',
    orgnumber : '',
    pidnumber : '',
    addressinp : '',
    additionalInp : '',
    city : '',
    postal : '',
    gender: ''
  };
  invalidate = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0); }
  enter(e) {
    if (e.keyCode === 13) {
      document.getElementById('reg').click();
    }
  }
  checkformat() {
    const pidcheck = /^([0-9]{6})+\-([0-9]{4})$/;
    if (pidcheck.test(this.profiler.pidnumber) === false) {
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
  adddash() {
    if (this.profiler.pidnumber.length === 6) {
      this.profiler.pidnumber = this.profiler.pidnumber + '-';
    }
  }
  ngOnInit() {
    this.options = {
      multiple: false,
      theme: 'default',
      closeOnSelect: true,
    };
    this.genderdata = [
      {
        id: '0',
        text: 'Kön'
      },{
        id: 'male',
        text: 'Man'
      },
      {
        id: 'female',
        text: 'Kvinna'
      },
      {
        id: 'other',
        text: 'Övrig'
      }
    ];
    // this.value = 'other';
    if (localStorage.getItem('uid') !== null) {
      const userid = localStorage.getItem('uid');
      localStorage.setItem('reg_uid', userid);
    }
    const user = localStorage.getItem('reg_uid');
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
        this.error = 'Session timeout.';
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.status) {
        this.profiler = {
          company : res.data.company_name,
          orgnumber : res.data.organization_number,
          pidnumber : res.data.personal_id_number,
          addressinp : res.data.adrs_num_n_street,
          additionalInp : res.data.adrs_additional_info,
          city : res.data.city,
          postal : res.data.postcode,
          gender: res.data.gender
        };
      }
    });
  }

  RemoveErr(name){
    if(name=='gender')this.genderErr = '';
    if(name=='company')this.companyErr = '';
    if(name=='organization')this.organizationErr = '';
    if(name=='pid')this.pidErr = '';
    if(name=='address')this.addressErr = '';
    if(name=='zip')this.zipErr = '';
    if(name=='city')this.cityErr = '';
 }

  regDetails() {
    const regMob = /^\d+$/;
    const pidcheck = /^([0-9]{6})+\-([0-9]{4})$/;
    if (this.profiler.gender === '' || this.profiler.gender === undefined || this.profiler.gender === '0') {
      this.genderErr = 'Ange kön.'; } else { this.genderErr = ''; }
    if (this.profiler.company === '') { this.companyErr = 'Ange Företagsnamn.'; } else { this.companyErr = ''; }
    if (this.profiler.orgnumber === '') { this.organizationErr = 'Ange Organisationsnummer.'; }
    else {
      if (this.profiler.orgnumber.length == 10) {
        if (regMob.test(this.profiler.orgnumber) === true) { this.organizationErr = ''; }
        else { this.organizationErr = 'Ange organisationsnumret.'; }
      } else {
        this.organizationErr = 'organisationsnumret måste vara 10 nummer långt';
      }
    }
    if (this.profiler.pidnumber === '') {
      this.pidErr = 'Ange Personnummer.';
    } else {
      if (pidcheck.test(this.profiler.pidnumber) === true) {
        this.pidErr = '';
      } else {
        this.pidErr = 'Ange endast numeriskt värde.';
      }
    }
    if (this.profiler.addressinp === '') { this.addressErr = 'Ange Gatuadress'; } else { this.addressErr = ''; }
    if (this.profiler.city === '') { this.cityErr = 'Ange Postort.'; } else { this.cityErr = ''; }
    if (this.profiler.postal === '') { this.zipErr = 'Ange Postnummer.'; } else { this.zipErr = ''; }

    if (
      this.profiler.gender !== undefined &&
      this.profiler.gender !== '0' &&
      this.profiler.company !== '' &&
      this.profiler.orgnumber !== '' &&
      this.profiler.orgnumber.length == 10 &&
      this.profiler.pidnumber !== '' &&
      this.profiler.addressinp !== '' &&
      this.profiler.city !== '' &&
      regMob.test(this.profiler.orgnumber) === true &&
      pidcheck.test(this.profiler.pidnumber) === true &&
      this.profiler.postal !== ''
      // givendate < currentDate
      ) {
      const user = localStorage.getItem('reg_uid');
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        api_key: 'coach@user#2',
        gender: this.profiler.gender,
        company_name: this.profiler.company,
        organization_number: this.profiler.orgnumber,
        personal_id_number: this.profiler.pidnumber,
        adrs_num_n_street: this.profiler.addressinp,
        adrs_additional_info: this.profiler.additionalInp,
        city: this.profiler.city,
        postcode: this.profiler.postal,
        uid: user
      };
      this.auth.cleanerDetailsSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.error = 'Session timeout.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status) {
          this.pidErr = '';
          localStorage.setItem('final', 'true');
          this.router.navigate(['/qwiz-page']);
        } else {
          if (res.message === 'Personnumret är redan registrerat.') {
            this.pidErr = res.message;
          } else {
            this.pidErr = '';
            this.error = res.message;
          }
        }
      });
    }

  }
  // gender(gen) { this.genderType = gen; }
  // day(dayS) { this.dayType = dayS; }
  // month(monthS) { this.monthType = monthS; }
  // year(yearS) { this.yearTYpe = yearS; }
}
