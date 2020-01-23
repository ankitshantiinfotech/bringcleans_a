import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
@Component({
  selector: 'app-empl-dashboard',
  templateUrl: './empl-dashboard.component.html',
  styleUrls: ['./empl-dashboard.component.scss'],
  providers: [AppGlobals]
})
export class EmplDashboardComponent implements OnInit {
  public needforData: Array<Select2OptionData>;
  public timeforData: Array<Select2OptionData>;
  public preftimeData: Array<Select2OptionData>;
  public options: Options;
  cleaners = [];
  imageBaseUrl = '';
  theCheckbox1 = false;
  petscheck = 0;
  theCheckbox2 = false;
  ironingcheck = 0;
  theCheckbox3 = false;
  anothercheck = 0;
  theCheckbox4 = false;
  windowscheck = 0;
  datetime = new Date();
  createddate = new Date(
    this.datetime.getFullYear(),
    this.datetime.getMonth(),
    this.datetime.getDate()
    );
  ondate: any;
  filters = {
    needfor: '0',
    timefor: '0',
    preftime: '0'
  };
  selected = [];
  checker = [];
  needforErr = '';
  ondateErr = '';
  timeforErr = '';
  preftimeErr = '';
  filterd = '0';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);}
  ngOnInit() {
    this.options = {
      multiple: false,
      theme: 'default',
      closeOnSelect: true
    };
    this.needforData = [
      { id: '0', text: 'Välj' },
      { id: 'weekly', text: 'Varje vecka' },
      { id: 'byweekly', text: 'Varannan vecka' },
      { id: 'once', text: 'En gång' }
      // { id: 'monthly', text: 'Var fjärde vecka' }
    ];
    this.timeforData = [{ id: '0', text: 'Välj timmar' }];
    for (let index = 3; index < 13; index++) {
      this.timeforData.push({ id: index.toString(), text: index + ' timmar' });
    }
    this.preftimeData = [{ id: '0', text: 'Välj tid' }];
    const x = 15;
    let tt = 0;
    const ap = ['AM', 'PM'];
    for (let i = 0; tt < 24 * 60; i++) {
      const hh = Math.floor(tt / 60);
      const mm = tt % 60;
      const ids = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2) + ':00';
      const texts = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2);
      this.preftimeData.push({ id: ids, text: texts });
      tt = tt + x;
    }
    const postcodes = localStorage.getItem('postcode');
    if (localStorage.getItem('needfor')) {
      this.filters.needfor = localStorage.getItem('needfor');
      if (this.filters.needfor == '0') {
        document.getElementById('first').classList.add('oemt');
      }
    }
    if (localStorage.getItem('ondate')) {
      this.ondate = new Date(localStorage.getItem('ondate'));
      document.getElementById('first').classList.add('oemt');
    }
    if (localStorage.getItem('timefor')) {
      this.filters.timefor = localStorage.getItem('timefor');
      document.getElementById('third').classList.add('oemt');
    }
    if (localStorage.getItem('preftime')) {
      this.filters.preftime = localStorage.getItem('preftime');
      document.getElementById('forth').classList.add('oemt');
    } else {
      this.filters.preftime = '06:00:00';
    }
    if (this.theCheckbox1 == true) {
      this.petscheck = 1;
    } else {
      this.petscheck = 0;
    }
    if (this.theCheckbox2 == true) {
      this.ironingcheck = 1;
    } else {
      this.ironingcheck = 0;
    }
    if (this.theCheckbox3 == true) {
      this.anothercheck = 1;
    } else {
      this.anothercheck = 0;
    }
    if (this.theCheckbox4 == true) {
      this.windowscheck = 1;
    } else {
      this.windowscheck = 0;
    }
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      postcode: postcodes,
      pets: this.petscheck,
      ironing: this.ironingcheck,
      available_on_another: this.anothercheck,
      windows: this.windowscheck,
      needfor: this.filters.needfor,
      ondate: this.ondate,
      timefor: this.filters.timefor,
      preftime: this.filters.preftime
    };
    this.auth.cleanerListingSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      this.cleaners = res.data;
      this.imageBaseUrl = this.baseUrl.baseAppUrl;
      if (localStorage.getItem('selectCheckers')) {
        this.filterd = '1';
        this.selected = JSON.parse(localStorage.getItem('selectedCleaners'));
        this.checker = JSON.parse(localStorage.getItem('selectCheckers'));
        setTimeout(() => {
          this.checker.forEach(checkerSelect => {
            document.getElementById('cleaner' + checkerSelect).innerText = 'VÄLJ';
            document.getElementById('cleaner' + checkerSelect).classList.add('bg-gray');
            document.getElementById('cleaner' + checkerSelect).classList.remove('bg-blue');
            document.getElementById('active' + checkerSelect).classList.add('active');
          });
        }, 1000);
      }
    });
  }
  dateCheck() {
    this.checker.forEach(checkerSelect => {
      document.getElementById('cleaner' + checkerSelect).innerText = 'VÄLJ';
      document.getElementById('cleaner' + checkerSelect).classList.remove('bg-gray');
      document.getElementById('cleaner' + checkerSelect).classList.add('bg-blue');
      document.getElementById('active' + checkerSelect).classList.remove('active');
    });
    this.selected = [];
    this.checker = [];
    if (this.ondate == '') {
      this.ondateErr = 'Datumfilter krävs.';
      this.filterd = '0';
    } else {
      this.ondateErr = '';
      this.filterd = '0';
    }
  }
  checkNeed(e) {
    this.checker.forEach(checkerSelect => {
      document.getElementById('cleaner' + checkerSelect).innerText = 'VÄLJ';
      document.getElementById('cleaner' + checkerSelect).classList.remove('bg-gray');
      document.getElementById('cleaner' + checkerSelect).classList.add('bg-blue');
      document.getElementById('active' + checkerSelect).classList.remove('active');
    });
    this.selected = [];
    this.checker = [];
    if (e != '0') {
      document.getElementById('first').classList.add('oemt');
      this.needforErr = ''; this.filterd = '0';
    } else {
      document.getElementById('first').classList.remove('oemt');
      this.filterd = '0';
      this.needforErr = 'Detta filter krävs.';
    }
  }
  checktimefor(e) {
    this.checker.forEach(checkerSelect => {
      document.getElementById('cleaner' + checkerSelect).innerText = 'VÄLJ';
      document.getElementById('cleaner' + checkerSelect).classList.remove('bg-gray');
      document.getElementById('cleaner' + checkerSelect).classList.add('bg-blue');
      document.getElementById('active' + checkerSelect).classList.remove('active');
    });
    this.selected = [];
    this.checker = [];
    if (e != '0') {
      document.getElementById('third').classList.add('oemt');
      this.timeforErr = '';
      this.filterd = '0';
    } else {
      document.getElementById('third').classList.remove('oemt');
      this.filterd = '0';
      this.timeforErr = 'Detta filter krävs.';
    }
  }
  checkpreftime(e) {
    this.checker.forEach(checkerSelect => {
      document.getElementById('cleaner' + checkerSelect).innerText = 'VÄLJ';
      document.getElementById('cleaner' + checkerSelect).classList.remove('bg-gray');
      document.getElementById('cleaner' + checkerSelect).classList.add('bg-blue');
      document.getElementById('active' + checkerSelect).classList.remove('active');
    });
    this.selected = [];
    this.checker = [];
    if (e != '0') {
      document.getElementById('forth').classList.add('oemt');
      this.preftimeErr = '';
      this.filterd = '0';
    } else {
      document.getElementById('forth').classList.remove('oemt');
      this.filterd = '0';
      this.preftimeErr = 'Tid krävs.';
    }
  }
  selectCleaner(selectedid, selectedname, selectedprofile) {
    if (this.filters.needfor == '0') {
      this.needforErr = 'Detta filter krävs.';
      this.filterd = '0';
    } else {
      this.needforErr = '';
    }
    if (this.ondate == '') {
      this.ondateErr = 'Datumfilter krävs.';
      this.filterd = '0';
    } else {
      this.ondateErr = '';
    }
    if (this.filters.timefor == '0') {
      this.timeforErr = 'Detta filter krävs';
      this.filterd = '0';
    } else {
      this.timeforErr = '';
    }
    if (this.filters.preftime == '0') {
      this.preftimeErr = 'Tid krävs.';
      this.filterd = '0';
    } else {
      this.preftimeErr = '';
    }
    if (
      this.filters.needfor != '0' &&
      this.ondate != '' &&
      this.filters.timefor != '0' &&
      this.filters.preftime != '0' &&
      this.filterd != '0'
    ) {
      const selectedUser = {
        id: selectedid,
        name: selectedname,
        profile: selectedprofile
      };
      if (!this.checker.includes(selectedid)) {
        this.checker.push(selectedid);
        this.selected.push(selectedUser);
        document.getElementById('cleaner' + selectedid).innerText = 'VALD';
        document.getElementById('cleaner' + selectedid).classList.add('bg-gray');
        document.getElementById('cleaner' + selectedid).classList.remove('bg-blue');
        document.getElementById('active' + selectedid).classList.add('active');
      } else {
        const arrIndex = this.checker.indexOf(selectedid);
        document.getElementById('cleaner' + selectedid).innerText = 'VÄLJ';
        document.getElementById('cleaner' + selectedid).classList.add('bg-blue');
        document.getElementById('cleaner' + selectedid).classList.remove('bg-gray');
        document.getElementById('active' + selectedid).classList.remove('active');
        this.checker.splice(arrIndex, 1);
        this.selected.splice(arrIndex, 1);
      }
    } else {
      this.filterList();
    }
  }
  openDialogDash1(id) {
    localStorage.setItem('selectCleaner', id);
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {});
  }
  filterList() {
    if (this.filters.needfor == '0') {
      this.needforErr = 'Detta filter krävs.';
    } else {
      this.needforErr = '';
    }
    if (this.ondate == '') {
      this.ondateErr = 'Datumfilter krävs.';
    } else {
      this.ondateErr = '';
    }
    if (this.filters.timefor == '0') {
      this.timeforErr = 'Detta filter krävs';
    } else {
      this.timeforErr = '';
    }
    if (this.filters.preftime == '0') {
      this.preftimeErr = 'Tid krävs.';
    } else {
      this.preftimeErr = '';
    }
    if (
      this.filters.needfor != '0' &&
      this.ondate != '' &&
      this.filters.timefor != '0' &&
      this.filters.preftime != '0'
    ) {
      this.checker.forEach(checkerSelect => {
        document.getElementById('cleaner' + checkerSelect).innerText = 'VALD';
        document.getElementById('cleaner' + checkerSelect).classList.remove('bg-gray');
        document.getElementById('cleaner' + checkerSelect).classList.add('bg-blue');
        document.getElementById('active' + checkerSelect).classList.remove('active');
      });
      this.selected = [];
      this.checker = [];
      const postcodes = localStorage.getItem('postcode');
      if (this.theCheckbox1 == true) {
        this.petscheck = 1;
      } else {
        this.petscheck = 0;
      }
      if (this.theCheckbox2 == true) {
        this.ironingcheck = 1;
      } else {
        this.ironingcheck = 0;
      }
      if (this.theCheckbox3 == true) {
        this.anothercheck = 1;
      } else {
        this.anothercheck = 0;
      }
      if (this.theCheckbox4 == true) {
        this.windowscheck = 1;
      } else {
        this.windowscheck = 0;
      }
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        postcode: postcodes,
        pets: this.petscheck,
        ironing: this.ironingcheck,
        available_on_another: this.anothercheck,
        windows: this.windowscheck,
        needfor: this.filters.needfor,
        ondate: this.ondate,
        timefor: this.filters.timefor,
        preftime: this.filters.preftime
      };
      console.log(data);
      localStorage.setItem('needfor', this.filters.needfor);
      localStorage.setItem('ondate', this.ondate);
      localStorage.setItem('timefor', this.filters.timefor);
      localStorage.setItem('preftime', this.filters.preftime);
      this.auth.cleanerListingSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          localStorage.clear();
          window.location.href = '/login';
        }
        this.cleaners = res.data;
        this.imageBaseUrl = this.baseUrl.baseAppUrl;
      });
      this.filterd = '1';
    }
  }
  proceedBook() {
    document.getElementById('proceed').setAttribute('disabled', 'disabled');
    if (localStorage.getItem('access') === 'user') {
      if (this.theCheckbox1 === true) {
        this.petscheck = 1;
      }
      if (this.theCheckbox2 === true) {
        this.ironingcheck = 1;
      }
      if (this.theCheckbox3 === true) {
        this.anothercheck = 1;
      }
      if (this.theCheckbox4 === true) {
        this.windowscheck = 1;
      }
      localStorage.setItem('selectedCleaners', JSON.stringify(this.selected));
      localStorage.setItem('selectCheckers', JSON.stringify(this.checker));
      localStorage.setItem('needfor', this.filters.needfor);
      localStorage.setItem('ondate', this.ondate);
      localStorage.setItem('timefor', this.filters.timefor);
      localStorage.setItem('preftime', this.filters.preftime);
      localStorage.setItem('petscheck', this.petscheck.toString());
      localStorage.setItem('ironingcheck', this.ironingcheck.toString());
      localStorage.setItem('anothercheck', this.anothercheck.toString());
      localStorage.setItem('windowscheck', this.windowscheck.toString());
      const accesstoken = localStorage.getItem('access_token');
      const accessUser = localStorage.getItem('access');
      const deviceid = localStorage.getItem('device_id');
      const devicetype = localStorage.getItem('device_type');
      const ondateVal = localStorage.getItem('ondate');
      const zip = localStorage.getItem('postcode');
      const needforval = localStorage.getItem('needfor');
      const preftimeval = localStorage.getItem('preftime');
      const timeforval = localStorage.getItem('timefor');
      const cleanersIds = this.checker.join();
      const petscheck = localStorage.getItem('petscheck');
      const ironingcheck = localStorage.getItem('ironingcheck');
      const anothercheck = localStorage.getItem('anothercheck');
      const windowscheck = localStorage.getItem('windowscheck');
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
        windows: windowscheck,
        needfor: needforval,
        preftime: preftimeval,
        timefor: timeforval,
        cleaners: cleanersIds
      };
      this.auth.processBookingSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status == '0') {
          document.getElementById('proceed').removeAttribute('disabled');
          if (res.message == 'Du kan inte välja en tid som redan varit') {
            this.preftimeErr = res.message;
          } else {
            this.ondateErr = res.message;
          }
          window.scrollTo(0, 0);
        } else {
          if (localStorage.getItem('uid')) {
            document.getElementById('proceed').removeAttribute('disabled');
            this.router.navigate(['/bookstep-2']);
          } else {
            document.getElementById('proceed').removeAttribute('disabled');
            this.router.navigate(['/bookstep-1']);
          }
        }
      });
    } else {
      document.getElementById('proceed').removeAttribute('disabled');
      this.router.navigate(['/']);
    }
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./empl-dashboard.component.scss'],
  providers: [AppGlobals]
})
export class DialogContentExampleDialog {
  cleanerid = '';
  cleanName = '';
  cleanAbout = '';
  cleanRating = 0;
  cleanIroning = 0;
  cleanId = 0;
  cheanRefCheck = 0;
  cleanPets = 0;
  cleanWindow = 0;
  ratingLists:any;
  cleanProfile = 'assets/images/round-img4.png';
  btntext = '';
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {
    window.scrollTo(0, 0);
    this.cleanerid = localStorage.getItem('selectCleaner');
    localStorage.removeItem('selectCleaner');
    const data = { cleaner_id: this.cleanerid };
    this.auth.viewProfileSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      this.cleanName = res.data.first_name;
      this.cleanAbout = res.data.about_me;
      this.cleanRating = res.data.rating;
      this.cleanIroning = res.data.ironing;
      this.cleanId = res.data.admin_approve_status;
      this.cleanWindow = res.data.windows;
      this.cleanPets = res.data.pets;
      this.ratingLists =res.rating;
      //console.log(this.ratingLists);
      if (res.data.profile_pic !== '') {
        this.cleanProfile = this.baseUrl.baseAppUrl + 'uploads/profile_pic/' + res.data.profile_pic;
      }
      this.btntext = document.getElementById('cleaner' + this.cleanerid).innerText;
    });
  }
  selectCleaner(id) {
    document.getElementById('cleaner' + id).click();
    document.getElementById('closePop').click();
  }
}
