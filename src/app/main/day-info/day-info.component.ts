import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { BookingService } from '../../service/booking.service';
import { tokendata } from '../home/variable';
import { interval, Subscription } from 'rxjs';
import { LoginHeaderComponent } from 'src/app/layout/login-header/login-header.component';
import { AppGlobals } from '../../app.global';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-day-info',
  templateUrl: './day-info.component.html',
  styleUrls: ['./day-info.component.scss'],
  providers: [ AppGlobals]
})
export class DayInfoComponent implements OnInit, OnDestroy {

  bookingDet: any = [];
  public bookstatus: Array<Select2OptionData>;
  public options: Options;
  book: any = {
    action: ''
  };
  success = true;
  successMsg = '';
  error = true;
  errMsg = '';
  iscleaner = true;
  nodisplay = 'no';
  disputed = 'no';
  status = '';
  ChatData: any;
  CurrentUserId = '';
  messageValue = '';
  recieverId = '';
  lastMsgId = '';
  scrollBottom = false;
  user = localStorage.getItem('uid');
  accessToken = localStorage.getItem('access_token');
  deviceId = localStorage.getItem('device_id');
  deviceType = localStorage.getItem('device_type');
  accessI = localStorage.getItem('access');
  bookId = localStorage.getItem('booking_id');
  bookDetId = localStorage.getItem('booking_det_id');
  myselect: any;
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  subscription: Subscription;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private booking: BookingService,
    private baseUrl: AppGlobals,
    private route: ActivatedRoute,
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('bookingid') && this.route.snapshot.paramMap.get('detailsid')) {
      localStorage.setItem('booking_det_id', this.route.snapshot.paramMap.get('bookingid'));
      localStorage.setItem('booking_id', this.route.snapshot.paramMap.get('detailsid'));
    }
    this.ChatData = [];
    this.options = {
      multiple: false,
      theme: 'default',
      closeOnSelect: true,
    };
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const bookId = localStorage.getItem('booking_id');
    const bookDetId = localStorage.getItem('booking_det_id');
    this.CurrentUserId = user;
    if (accessI == 'cleaner') {
      this.bookstatus = [
        { id: 'confirmed', text: 'Bekräftad'},
        { id: 'incomplete', text: 'Ofullständig'},
        { id: 'completed', text: 'Klar'}
      ];
      this.iscleaner = false;
    } else {
      this.bookstatus = [
        { id: 'confirmed', text: 'Bekräftad'},
        { id: 'incomplete', text: 'Ofullständig'},
        { id: 'completed', text: 'Klar'}
      ];
    }
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: 'cleaner@user#2',
      access: accessI,
      access_token: accessToken,
      booking_id: bookDetId,
      booking_details_id: bookId
    };
    this.book.action = '0';
    this.booking.getBookDetailsSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.data[0]) {
        this.bookingDet = res.data[0];
        this.book.action = res.data[0].status;
        if (res.data[0].dispute_reason != '') {
          this.disputed = 'yes';
        }
        if(res.data[0].user_id != this.user) { this.recieverId = res.data[0].user_id; }
        if(res.data[0].cleaner_id != this.user) { this.recieverId = res.data[0].cleaner_id; }
      }
      if (accessI == 'cleaner') {
        if (this.book.action == 'canceled') { this.nodisplay = 'yes'; this.iscleaner = false;
        } else if (this.book.action == 'completed' || this.book.action == 'incomplete') {
          this.nodisplay = 'yes'; this.iscleaner = false;
        }
      } else {
        if (this.book.action == 'canceled') {
          this.nodisplay = 'yes'; this.iscleaner = false;
        } else if (this.book.action == 'completed' || this.book.action == 'incomplete' ) {
          let statustext = '';
          if (this.book.action == 'incomplete') {
            statustext = 'Ofullständig';
          } else {
            statustext = 'Klar';
          }
          this.bookstatus = [
            { id: '0', text: statustext},
            { id: 'dispute', text: 'Ta upp tvisten'}
          ];
          this.iscleaner = false;
          this.book.action = res.data[0].status;
          this.myselect.select(res.data[0].status);
        }
      }
     //  console.log(res);
      if (res.data[0]) {
         this.book.action = res.data[0].status;
         console.log(res.data[0].status);
         if (res.data[0].status == 'incomplete') {
          this.status = 'Ofullständig';
        } else if (res.data[0].status == 'completed') {
          this.status = 'Klar';
        } else if (res.data[0].status == 'cancelled') {
          this.status = 'inställt';
        } else {
          this.status = 'Ta upp tvisten';
        }
      }
    });
     /****Chat *************************/
    const WhereData = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      device_id: this.deviceId,
      device_type: this.deviceType,
      api_key: 'cleaner@user#2',
      access: this.accessI,
      access_token: this.accessToken,
      uid: this.user,
      booking_id: this.bookDetId,
      booking_details_id: this.bookId
    };

    this.booking.getChatHistory(WhereData).subscribe((res: tokendata) => {
      if (res.data.length) {
        res.data.forEach(chat => {
          this.lastMsgId = chat.id;
        });
        this.ChatData = res.data;
        this.scrollBottom = true;
      }
    });
    const source = interval(5000);
    this.subscription = source.subscribe(() => {
       this.loadchat();
    });
  }

  loadchat() {

    const WhereData = {
      base_url_server: this.baseUrl.baseAppUrl,
      base_url_client: this.baseUrl.baseAppUrlC,
      device_id: this.deviceId,
      device_type: this.deviceType,
      api_key: 'cleaner@user#2',
      access: this.accessI,
      access_token: this.accessToken,
      uid: this.user,
      booking_id: this.bookDetId,
      booking_details_id: this.bookId,
      last_id: this.lastMsgId
    };
    this.booking.getChatCronData(WhereData).subscribe((res: tokendata) => {
      if (res.data.length) {
        res.data.forEach(chat => {
          this.lastMsgId = chat.id;
          this.ChatData.push(chat);
          this.scrollBottom = true;
         });
      } else {
        this.scrollBottom = false;
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  scrollToBottom() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  sendMessage() {
    if (this.messageValue == '') {
      return false;
    }
    document.getElementById('sendbox_btn').setAttribute('disabled', 'disabled');
    document.getElementById('sendbox_input').setAttribute('disabled', 'disabled');
    const MessageData = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      device_id: this.deviceId,
      device_type: this.deviceType,
      api_key: 'cleaner@user#2',
      access: this.accessI,
      access_token: this.accessToken,
      uid: this.user,
      booking_id: this.bookDetId,
      booking_detail_id: this.bookId,
      receiver_id: this.recieverId,
      message: this.messageValue
    };

    this.booking.postChatMessage(MessageData).subscribe((res: tokendata) => {
      if (res.status) {
          this.ChatData.push(res.data[0]);
          this.messageValue = '';
          this.lastMsgId = res.data[0].id;
          this.scrollBottom = true;
          document.getElementById('sendbox_btn').removeAttribute('disabled');
          document.getElementById('sendbox_input').removeAttribute('disabled');
      }
      else {
        document.getElementById('sendErrMsg').innerHTML = res.message;
      }
    });
  }

  updateAction(e) {
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const bookId = localStorage.getItem('booking_id');
    if (e === 'dispute') {
      const dialogRef = this.dialog.open(DusputePopup);
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    } else {
      if (e != '0') {
        const dialogRef = this.dialog.open(DayInfoCom);
        localStorage.setItem('statusUpate', e);
        dialogRef.afterClosed().subscribe(result => {
          const popStatus = localStorage.getItem('popstatus');
          const popMessage = localStorage.getItem('popmessage');
          if (popStatus != 'null' || popStatus != null) {
            if (popStatus == '1') {
              this.success = false;
              this.successMsg = popMessage;
              setTimeout(() => {
                this.success = true;
                this.successMsg = '';
              }, 3000);
              this.ngOnInit();
            } else if (popStatus == '0') {
              if (popMessage != 'Invalid action') {
                this.error = false;
                this.errMsg = popMessage;
                setTimeout(() => {
                  this.error = true;
                  this.errMsg = '';
                }, 3000);
              }
              this.ngOnInit();
            } else {
              this.ngOnInit();
            }
            localStorage.removeItem('popstatus');
            localStorage.removeItem('popmessage');
            localStorage.removeItem('statusUpate');
          } else {
            this.ngOnInit();
          }
        });

      }
    }
  }
  BookingCencelPopup(type) {
    localStorage.setItem('typeReq', type);
    const dialogRef = this.dialog.open(BookingCencelPopup);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  DusputePopup() {
    const dialogRef = this.dialog.open(DusputePopup);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}

@Component({
  selector: 'booking-cencel-popup',
  templateUrl: 'booking-cencel-popup.html',
  styleUrls: ['./day-info.component.scss'],
  providers: [ AppGlobals]
})

export class BookingCencelPopup {
  public exampleData: Array<Select2OptionData>;
  type = '';
  reason = '';
  error = '';
  loss = '0';
  constructor(
    public dialogRef: MatDialogRef<BookingCencelPopup>,
    private router: Router,
    private auth: AuthService,
    private booking: BookingService,
    private baseUrl: AppGlobals
    ) {
      window.scrollTo(0, 0);
      this.type = localStorage.getItem('typeReq');
      this.exampleData = [
        {
          id: '0',
          text: 'Jag har inte längre behov av städning.'
        }, {
          id: 'I would like to skip this clean as it is not required.',
          text: 'Jag har anlitat en annan städare via BringClean.'
        }
        // {
        //   id: 'I would like to skip this clean as it is not required.',
        //   text: 'Jag har anlitat en annan städare utanför BringClean.'
        // }
      ];
      this.reason = '0';
      const user = localStorage.getItem('uid');
      const accessToken = localStorage.getItem('access_token');
      const deviceId = localStorage.getItem('device_id');
      const deviceType = localStorage.getItem('device_type');
      const accessI = localStorage.getItem('access');
      const bookId = localStorage.getItem('booking_id');
      const bookDetId = localStorage.getItem('booking_det_id');
      let canceltype = '';
      if (this.type == 'this') { canceltype = 'canel_this'; } else { canceltype = 'canel_all'; }
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        uid: user,
        device_id: deviceId,
        device_type: deviceType,
        api_key: 'cleaner@user#2',
        access: accessI,
        access_token: accessToken,
        booking_id: bookDetId,
        booking_details_id: bookId,
        cancel_type: canceltype
      };
      this.booking.getLossSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.error = 'Session timeout logging out.';
          localStorage.clear();
          window.location.href = '/login';
        }
        this.loss = res.loss_amount;
      });
    }
    cancelBooking() {
      if (this.reason != '0') {
        const user = localStorage.getItem('uid');
        const accessToken = localStorage.getItem('access_token');
        const deviceId = localStorage.getItem('device_id');
        const deviceType = localStorage.getItem('device_type');
        const accessI = localStorage.getItem('access');
        const bookId = localStorage.getItem('booking_id');
        const bookDetId = localStorage.getItem('booking_det_id');
        const data = {
          base_url_server: this.baseUrl.baseAppUrl,
          base_url_client: this.baseUrl.baseAppUrlC,
          uid: user,
          device_id: deviceId,
          device_type: deviceType,
          api_key: 'cleaner@user#2',
          access: accessI,
          access_token: accessToken,
          booking_id: bookDetId,
          booking_details_id: bookId,
          loss_amount: this.loss,
          cancel_reason: this.reason
        };
        if (this.type == 'this') {
          this.booking.cancelThisSrvs(data).subscribe((res: tokendata) => {
            if (res.status == '2') {
              this.error = 'Session timeout logging out.';
              localStorage.clear();
              window.location.href = '/login';
            }
            if (res.status) {
              document.getElementById('no').click();
            } else {
              this.error = res.message;
            }
          });
        } else {
          this.booking.cancelAllSrvs(data).subscribe((res: tokendata) => {
            if (res.status == '2') {
              this.error = 'Session timeout logging out.';
              localStorage.clear();
              window.location.href = '/login';
            }
            if (res.status) {
              document.getElementById('no').click();
            } else {
              this.error = res.message;
            }
          });
        }
      } else {
        this.error = 'Inled en tvist';
      }
    }
  }

@Component({
  selector: 'dispute-popup',
  templateUrl: 'dispute-popup.html',
  styleUrls: ['./day-info.component.scss'],
  providers: [ AppGlobals]
})

export class DusputePopup {
  dispute: any = {
    bookingid: '',
    title: '',
    reason: ''
  };
  titleErr = '';
  reasonErr = '';
  error = '';
  constructor(
    public dialogRef: MatDialogRef<DusputePopup>,
    private router: Router,
    private auth: AuthService,
    private booking: BookingService,
    private baseUrl: AppGlobals
  ) {
    window.scrollTo(0, 0);
    this.dispute.bookingid = 'BRINC' + localStorage.getItem('booking_det_id') +  localStorage.getItem('booking_id');
}
  raiseDispute() {
    if (this.dispute.title === '') { this.titleErr = 'Titel krävs.';
    } else { this.titleErr = ''; }
    if (this.dispute.reason === '') { this.reasonErr = 'Inled en tvist';
    } else { this.reasonErr = ''; }
    if (this.dispute.title !== '' && this.dispute.reason !== '') {
      const user = localStorage.getItem('uid');
      const accessToken = localStorage.getItem('access_token');
      const deviceId = localStorage.getItem('device_id');
      const deviceType = localStorage.getItem('device_type');
      const accessI = localStorage.getItem('access');
      const bookId = localStorage.getItem('booking_det_id');
      const bookDetId = localStorage.getItem('booking_id');
      const data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        uid: user,
        device_id: deviceId,
        device_type: deviceType,
        api_key: 'cleaner@user#2',
        access: accessI,
        access_token: accessToken,
        booking_id: bookId,
        booking_details_id: bookDetId,
        title: this.dispute.title,
        reason: this.dispute.reason
      };
      this.booking.raiseDisputeSrvs(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          this.error = 'Session timeout logging out.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res.status) {
          document.getElementById('close').click();
        } else {
          this.error = res.message;
        }
      });
    }
  }
}
@Component({
  selector: 'day-info-com-incom-pappup',
  templateUrl: 'day-info-com-incom-pappup.html',
  styleUrls: ['./day-info.component.scss'],
  providers: [ AppGlobals]
})
export class DayInfoCom implements OnInit  {
  statusUpdate = '';
  // closeConf
  constructor(
    private router: Router,
    private auth: AuthService,
    public dialogRef: MatDialogRef<DayInfoCom>,
    private booking: BookingService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);}
  ngOnInit() {
    this.statusUpdate = localStorage.getItem('statusUpate');
  }
  confirm() {
    document.getElementById('yes').setAttribute('disable', 'disable');
    document.getElementById('closeConf').setAttribute('disable', 'disable');
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const bookId = localStorage.getItem('booking_id');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: 'cleaner@user#2',
      access: accessI,
      access_token: accessToken,
      booking_details_id: bookId,
      action: this.statusUpdate
    };
    this.booking.changeActionSrvs(data).subscribe((res: tokendata) => {
      localStorage.setItem('popstatus', res.status);
      localStorage.setItem('popmessage', res.message);
      document.getElementById('closeConf').click();
      document.getElementById('yes').removeAttribute('disable');
      document.getElementById('closeConf').removeAttribute('disable');
    });
  }

}

