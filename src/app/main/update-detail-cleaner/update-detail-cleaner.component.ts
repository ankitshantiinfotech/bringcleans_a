import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-update-detail-cleaner',
  templateUrl: './update-detail-cleaner.component.html',
  styleUrls: ['./update-detail-cleaner.component.scss'],
  providers: [ AppGlobals]
})
export class UpdateDetailCleanerComponent implements OnInit {

  public genderData: Array<Select2OptionData>;
  public options: Options;

  profile: any = {
    first: '',
    last: '',
    email: '',
    gender: '',
    phone: '',
    company: '',
    orgNumber: '',
    personalid: '',
    address: '',
    additonalAdd: '',
    city: '',
    zip: ''
  };
  readonly = '';
  selected = '0';
  firstErr = '';
  lastErr = '';
  phoneErr = '';
  companyErr = '';
  orgNumberErr = '';
  addressErr = '';
  additonalAddErr = '';
  cityErr = '';
  zipErr = '';
  genderErr = '';

  success = true;
  error = true;
  successMsg = '';
  errMsg = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) { window.scrollTo(0, 0);}

  ngOnInit() {
    this.options = {
      multiple: false,
      theme: 'default',
      closeOnSelect: true,
    };
    this.genderData = [
      {
        id: '0',
        text: 'Kön'
      }, {
        id: 'male',
        text: 'Man'
      }, {
        id: 'female',
        text: 'Kvinna'
      }, {
        id: 'other',
        text: 'Övrig'
      }
    ];
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
      if(res.data.admin_approve_status == '1') {
        document.getElementById('email').setAttribute('readonly', 'readonly');
        document.getElementById('phone').setAttribute('readonly', 'readonly');
      }
      if (res.status == '2') {
        this.errMsg = 'Session timeout.';
        localStorage.clear();
        window.location.href = '/login';
      }
      this.profile.first = res.data.first_name;
      this.profile.last = res.data.last_name;
      this.profile.email = res.data.email;
      this.profile.phone = res.data.mobile;
      this.profile.company = res.data.company_name;
      this.profile.orgNumber = res.data.organization_number;
      this.profile.personalid = res.data.personal_id_number;
      this.profile.address = res.data.adrs_num_n_street;
      this.profile.additonalAdd = res.data.adrs_additional_info;
      this.profile.city = res.data.city;
      this.profile.zip = res.data.postcode;
      this.profile.gender = res.data.gender;
    });
  }
  public handleAddressChange(address: any) {
    for (let comp of address.address_components) {
      if (comp.types[0] == 'sublocality_level_1') {
        this.profile.address = comp.long_name;
      }
      if (comp.types[0] == 'administrative_area_level_2') {
        this.profile.address = this.profile.address + ", " + comp.long_name;
        this.profile.city = comp.long_name;
      }
      if (comp.types[0] == 'administrative_area_level_1') {
        this.profile.address = this.profile.address + " " + comp.long_name;
      }
      if (comp.types[0] == 'country') {
        this.profile.address = this.profile.address + " " + comp.long_name;
      }
      if (comp.types[0] == 'postal_code') {
        this.profile.zip = comp.long_name;
      }
    }
  }
  gender(value) { this.selected = value; }
  updateDet() {
    const regMob = /^\d+$/;
    const firstTwo = this.profile.phone.substring(0,2);
    if (this.profile.first === '') { this.firstErr = 'Förnamn krävs.'; } else { this.firstErr = ''; }
    if (this.profile.last === '') { this.lastErr = 'Efternamn krävs.'; } else { this.lastErr = ''; }
    if (this.profile.phone === '') { this.phoneErr = 'Mobilnummer krävs'; } else {
      if (this.profile.phone.length < 10) {
        this.phoneErr = 'Telefonnummer ska vara 10 nummer långt.';
      } else {
        if (regMob.test(this.profile.phone) === true) {
          if (firstTwo != '07') {
            this.phoneErr = 'Mobilnumret måste börja med 07.';
          } else { this.phoneErr = ''; }
        }
        else { this.phoneErr = 'Ange giltigt mobilnummer.'; }
      }
    }
    if (this.profile.company === '') { this.companyErr = 'Ange Företagsnamn'; } else { this.companyErr = ''; }
    if (this.profile.orgNumber === '') { this.orgNumberErr = 'Ange Organisationsnummer.'; } else {
      if (this.profile.orgNumber.length == 10) {
        if (regMob.test(this.profile.orgNumber) === true) {
          this.orgNumberErr = '';
        } else {
          this.orgNumberErr = 'Ange endast numeriska värden.';
        }
      } else {
        this.orgNumberErr = 'Organisationsnumret måste vara 10 nummer långt.';
      }
    }
    if (this.profile.address === '') { this.addressErr = 'Ange Gatuadress.'; } else { this.addressErr = ''; }
    // if (this.profile.additonalAdd === '') { this.additonalAddErr = ''; } else { this.additonalAddErr = ''; }
    if (this.profile.city === '') { this.cityErr = 'Ange Postort'; } else { this.cityErr = ''; }
    if (this.profile.zip === '') { this.zipErr = 'Ange Postnummer'; } else { this.zipErr = ''; }
    if (this.profile.gender === '0') { this.genderErr = 'Välj kön för att fortsätta.'; } else { this.genderErr = ''; }
    if (
      this.profile.first !== '' &&
      this.profile.last !== '' &&
      this.profile.phone !== '' &&
      regMob.test(this.profile.phone) === true &&
      this.profile.company !== '' &&
      this.profile.orgNumber !== '' &&
      regMob.test(this.profile.orgNumber) === true &&
      this.profile.address !== '' &&
      this.profile.city !== '' &&
      this.profile.zip !== '' &&
      this.profile.gender !== '0' &&
      this.profile.phone.length >= 10 &&
      firstTwo == '07' &&
      this.profile.orgNumber.length == 10
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
        access_token: accessToken,
        first_name: this.profile.first,
        last_name: this.profile.last,
        mobile: this.profile.phone,
        gender: this.profile.gender,
        company_name: this.profile.company,
        organization_number: this.profile.orgNumber,
        adrs_num_n_street: this.profile.address,
        adrs_additional_info: this.profile.additonalAdd,
        city: this.profile.city,
        postcode: this.profile.zip,
      };
      this.auth.cleanerProfUpdateSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.errMsg = 'Session timeout.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status) {
          localStorage.setItem('first_name', this.profile.first);
          localStorage.setItem('last_name', this.profile.last);
          this.success = false;
          this.successMsg = res.message;
          setTimeout(() => {
            this.success = true;
            this.successMsg = '';
          }, 3000);
        } else {
          this.error = false;
          this.errMsg = res.message;
          setTimeout(() => {
            this.error = true;
            this.errMsg = '';
          }, 3000);
        }
        window.scrollTo(0, 0);
      });
    }
  }
}
