import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-working-hourse',
  templateUrl: './working-hourse.component.html',
  styleUrls: ['./working-hourse.component.scss'],
  providers: [ AppGlobals]
})
export class WorkingHourseComponent implements OnInit {

  public monstartData: Array<Select2OptionData>;
  public tuestartData: Array<Select2OptionData>;
  public wedstartData: Array<Select2OptionData>;
  public thustartData: Array<Select2OptionData>;
  public fristartData: Array<Select2OptionData>;
  public satstartData: Array<Select2OptionData>;
  public sunstartData: Array<Select2OptionData>;
  public monendData: Array<Select2OptionData>;
  public tueendData: Array<Select2OptionData>;
  public wedendData: Array<Select2OptionData>;
  public thuendData: Array<Select2OptionData>;
  public friendData: Array<Select2OptionData>;
  public satendData: Array<Select2OptionData>;
  public sunendData: Array<Select2OptionData>;
  public options: Options;
  success = true;
  error = true;
  successMsg = '';
  errMsg = '';
  errors = '';
  // check box
  monday = false;
  tuesday = false;
  wednesday = false;
  thursday = false;
  friday = false;
  saturday = false;
  sunday = false;
  // start time
  time: any = {
    monstart: '',
    tuestart: '',
    wedstart: '',
    thustart: '',
    fristart: '',
    satstart: '',
    sunstart: '',
    monend: '',
    tueend: '',
    wedend: '',
    thuend: '',
    friend: '',
    satend: '',
    sunend: '',
  };
  // end time
  // error
  monerr = '';
  tueerr = '';
  wederr = '';
  thuerr = '';
  frierr = '';
  saterr = '';
  sunerr = '';
  nocheck = true;
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);}
  ngOnInit() {
    this.options = {
      multiple: false,
      theme: 'default',
      closeOnSelect: true,
    };
    this.monstartData = [{ id: '0', text: 'Select Time' }];
    this.tuestartData = [{ id: '0', text: 'Select Time' }];
    this.wedstartData = [{ id: '0', text: 'Select Time' }];
    this.thustartData = [{ id: '0', text: 'Select Time' }];
    this.fristartData = [{ id: '0', text: 'Select Time' }];
    this.satstartData = [{ id: '0', text: 'Select Time' }];
    this.sunstartData = [{ id: '0', text: 'Select Time' }];
    this.monendData = [{ id: '0', text: 'Select Time' }];
    this.tueendData = [{ id: '0', text: 'Select Time' }];
    this.wedendData = [{ id: '0', text: 'Select Time' }];
    this.thuendData = [{ id: '0', text: 'Select Time' }];
    this.friendData = [{ id: '0', text: 'Select Time' }];
    this.satendData = [{ id: '0', text: 'Select Time' }];
    this.sunendData = [{ id: '0', text: 'Select Time' }];
    const x = 15;
    let tt = 0;
    const ap = ['AM', 'PM'];
    for (let i = 0; tt < 24 * 60; i++) {
      let hh = Math.floor(tt / 60);
      let mm = (tt % 60);
      let ids = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':00';
      let texts = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2);
      this.monstartData.push( { id: ids, text: texts} );
      this.tuestartData.push( { id: ids, text: texts} );
      this.wedstartData.push( { id: ids, text: texts} );
      this.thustartData.push( { id: ids, text: texts} );
      this.fristartData.push( { id: ids, text: texts} );
      this.satstartData.push( { id: ids, text: texts} );
      this.sunstartData.push( { id: ids, text: texts} );
      this.monendData.push( { id: ids, text: texts} );
      this.tueendData.push( { id: ids, text: texts} );
      this.wedendData.push( { id: ids, text: texts} );
      this.thuendData.push( { id: ids, text: texts} );
      this.friendData.push( { id: ids, text: texts} );
      this.satendData.push( { id: ids, text: texts} );
      this.sunendData.push( { id: ids, text: texts} );
      tt = tt + x;
    }
    this.time.monstart = '08:00:00';
    this.time.tuestart = '08:00:00';
    this.time.wedstart = '08:00:00';
    this.time.thustart = '08:00:00';
    this.time.fristart = '08:00:00';
    this.time.satstart = '08:00:00';
    this.time.sunstart = '08:00:00';
    this.time.monend = '19:00:00';
    this.time.tueend = '19:00:00';
    this.time.wedend = '19:00:00';
    this.time.thuend = '19:00:00';
    this.time.friend = '19:00:00';
    this.time.satend = '19:00:00';
    this.time.sunend = '19:00:00';
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
    this.auth.getWorkingHoursSrvs(data).subscribe((res: tokendata) => {
      console.log(res);

      if (res.status == '2') {
        this.errMsg = 'Session timeout.';
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.data[0].monday === 1) { this.monday = true; }
      if (res.data[0].tuesday === 1) { this.tuesday = true; }
      if (res.data[0].wednesday === 1) { this.wednesday = true; }
      if (res.data[0].thursday === 1) { this.thursday = true; }
      if (res.data[0].friday === 1) { this.friday = true; }
      if (res.data[0].saturday === 1) { this.saturday = true; }
      if (res.data[0].sunday === 1) { this.sunday = true; }
      if (res.data[0].monday_start !== '0') { this.time.monstart = res.data[0].monday_start; }
      if (res.data[0].tuesday_start !== '0') { this.time.tuestart = res.data[0].tuesday_start; }
      if (res.data[0].wednesday_start !== '0') { this.time.wedstart = res.data[0].wednesday_start; }
      if (res.data[0].thursday_start !== '0') { this.time.thustart = res.data[0].thursday_start; }
      if (res.data[0].friday_start !== '0') { this.time.fristart = res.data[0].friday_start; }
      if (res.data[0].saturday_start !== '0') { this.time.satstart = res.data[0].saturday_start; }
      if (res.data[0].sunday_start !== '0') { this.time.sunstart = res.data[0].sunday_start; }
      if (res.data[0].monday_end !== '0') { this.time.monend = res.data[0].monday_end; }
      if (res.data[0].tuesday_end !== '0') { this.time.tueend = res.data[0].tuesday_end; }
      if (res.data[0].wednesday_end !== '0') { this.time.wedend = res.data[0].wednesday_end; }
      if (res.data[0].thursday_end !== '0') { this.time.thuend = res.data[0].thursday_end; }
      if (res.data[0].friday_end !== '0') { this.time.friend = res.data[0].friday_end; }
      if (res.data[0].saturday_end !== '0') { this.time.satend = res.data[0].saturday_end; }
      if (res.data[0].sunday_end !== '0') { this.time.sunend = res.data[0].sunday_end; }
    });
  }
  setworking() {
    let check = false;
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    let monset = 0;
    let tueset = 0;
    let wedset = 0;
    let thuset = 0;
    let friset = 0;
    let satset = 0;
    let sunset = 0;
    this.nocheck = true;
    if (this.monday === true) {
      if (this.time.monstart === '' || this.time.monend === '') {
        this.nocheck = false;
        this.monerr = 'Start time and end time is required.';
      } else {
        this.monerr = '';
        monset = 1;
        check = true;
      }
    }
    if (this.tuesday === true) {
      if (this.time.tuestart === '' || this.time.tueend === '') {
        this.nocheck = false;
        this.tueerr = 'Start time and end time is required.';
      } else {
        this.tueerr = '';
        tueset = 1;
        check = true;
      }
    }
    if (this.wednesday === true) {
      if (this.time.wedstart === '' || this.time.wedend === '') {
        this.nocheck = false;
        this.wederr = 'Start time and end time is required.';
      } else {
        this.wederr = '';
        wedset = 1;
        check = true;
      }
    }
    if (this.thursday === true) {
      if (this.time.thustart === '' || this.time.thuend === '') {
        this.nocheck = false;
        this.thuerr = 'Start time and end time is required.';
      } else {
        this.thuerr = '';
        thuset = 1;
        check = true;
      }
    }
    if (this.friday === true) {
      if (this.time.fristart === '' || this.time.friend === '') {
        this.nocheck = false;
        this.frierr = 'Start time and end time is required.';
      } else {
        friset = 1;
        this.frierr = '';
        check = true;
      }
    }
    if (this.saturday === true) {
      if (this.time.satstart === '' || this.time.satend === '') {
        this.nocheck = false;
        this.saterr = 'Start time and end time is required.';
      } else {
        satset = 1;
        this.saterr = '';
        check = true;
      }
    }
    if (this.sunday === true) {
      if (this.time.sunstart === '' || this.time.sunend === '') {
        this.nocheck = false;
        this.sunerr = 'Start time and end time is required.';
      } else {
        this.sunerr = '';
        sunset = 1;
        check = true;
      }
    }
    if (this.nocheck === true && check === true) {
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        uid: user,
        device_id: deviceId,
        device_type: deviceType,
        api_key: 'cleaner@user#2',
        access: accessI,
        access_token: accessToken,
        sunday: sunset,
        monday: monset,
        tuesday: tueset,
        wednesday: wedset,
        thursday: thuset,
        friday: friset,
        saturday: satset,
        sunday_start: this.time.sunstart,
        sunday_end: this.time.sunend,
        monday_start: this.time.monstart,
        monday_end: this.time.monend,
        tuesday_start: this.time.tuestart,
        tuesday_end: this.time.tueend,
        wednesday_start: this.time.wedstart,
        wednesday_end: this.time.wedend,
        thursday_start: this.time.thustart,
        thursday_end: this.time.thuend,
        friday_start: this.time.fristart,
        friday_end: this.time.friend,
        saturday_start: this.time.satstart,
        saturday_end: this.time.satend
      };
      console.log(data);

      this.auth.setWorkingHoursSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.errMsg = 'Session timeout.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status) {
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
      });
      this.errors = '';
      window.scrollTo(0, 0);
    } else {
      this.errors = 'Uppdatera minst en tid';
      window.scrollTo(0, 200);
    }
  }
}
