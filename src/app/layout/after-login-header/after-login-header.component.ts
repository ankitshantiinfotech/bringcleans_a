import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../../main/home/variable';

@Component({
  selector: 'app-after-login-header',
  templateUrl: './after-login-header.component.html',
  styleUrls: ['./after-login-header.component.scss']
})
export class AfterLoginHeaderComponent implements OnInit, AfterViewInit {
  menuopen = false;
  logged = true;
  cleaner = true;
  user = true;
  CleanerName = '';
  MessageList = [];
  MessageCount = 0;
  uid = localStorage.getItem('uid');
  access_token = localStorage.getItem('access_token');
  access = localStorage.getItem('access');
  device_id = localStorage.getItem('device_id');
  device_type = localStorage.getItem('device_type');
  sendData = {
    access: this.access,
    device_id: this.device_id,
    access_token: this.access_token,
    api_key: 'cleaner@user#2',
    device_type: this.device_type,
    uid: this.uid
  };
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    const access = localStorage.getItem('access');
    if (access == 'user') {
      this.cleaner = true;
      this.user = false;
    } else {
      this.cleaner = false;
      this.user = true;
    }
    this.CleanerName = 'ANVÄNDARNAMN';
    if (localStorage.getItem('first_name')) {
      const lastname = localStorage.getItem('last_name');
      this.CleanerName =
        localStorage.getItem('first_name') + ' ' + lastname.charAt(0);
    }
    if (this.access == 'user') {
      this.cleaner = true;
      this.user = false;
    } else {
      this.cleaner = false;
      this.user = true;
    }
    if (
      localStorage.getItem('last_name') &&
      localStorage.getItem('first_name')
    ) {
      const lastname = localStorage.getItem('last_name');
      this.CleanerName =
        localStorage.getItem('first_name') + ' ' + lastname.charAt(0);
    }
    if (this.CleanerName == '') {
      this.CleanerName = 'ANVÄNDARNAMN';
    }
  }
  ngAfterViewInit() {
    this.auth.getNotificationSrvs(this.sendData).subscribe((res: tokendata) => {
      if (res.status == 1 && res.data.length > 0) {
        res.data.forEach(element => {
          element.msg = 'Nytt meddelande från ' + element.first_name;
          this.MessageList.push(element);
        });
        // console.log(this.MessageList);
      }
    });
    this.auth
      .getNotificationCountSrvs(this.sendData)
      .subscribe((res: tokendata) => {
        if (res.status == 1) {
          this.MessageCount = res.msg_count;
        }
      });
  }
  removeNotificationCount() {
    this.auth
      .removeNotificationCountSrvs(this.sendData)
      .subscribe((res: tokendata) => {
        if (res.status == 1) {
          this.MessageCount = 0;
        }
      });
    return false;
  }
  viewBooking(i, bookDetId, bookId) {
    localStorage.setItem('booking_id', bookId);
    localStorage.setItem('booking_det_id', bookDetId);
    this.auth
      .readNotificationSrvs({ uid: this.sendData, booking_id: bookId })
      .subscribe((res: tokendata) => {
        if (res.status == 1) {
          this.MessageCount = 0;
        }
      });
    this.router.navigate(['/day-info']);
  }
  openmenu() {
    this.menuopen = true;
  }
  closemenu() {
    this.menuopen = false;
  }
  logout() {
    this.auth.logoutSrv(this.sendData).subscribe((res: tokendata) => {
      localStorage.clear();
      this.menuopen = false;
      window.location.href = '/';
    });
  }
}
