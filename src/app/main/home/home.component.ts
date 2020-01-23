import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';
// import { GooglePlaceDirective } from '../../src'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ AppGlobals]
})


export class HomeComponent implements OnInit {
  postcodeErr1 = '';
  postcodeErr2 = '';
  postcodeErr3 = '';
  postcodeErr4 = '';
  postcodeErr5 = '';
  options = { };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ '', '' ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };
  totalBooking = 50000000;
  satisfied_customers = 3000;
  customer_rating = 4.1;
  over_cities = 5000;
  constructor(
    private token: AuthService,
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {
    window.scrollTo(0, 0);
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
      this.token.getToken(data).subscribe((res: tokendata) => {
        if (res.status == '2') {
          localStorage.clear();
          window.location.href = '/login';
        }
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
          this.token.getToken(data).subscribe((res: tokendata) => {
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
    });
  }
}

  public handleAddressChange(address: any) {
    console.log(address);
  }
  ngOnInit() {
    if (localStorage.getItem('access') === 'cleaner' && ( localStorage.getItem('uid') == '' ||localStorage.getItem('uid') <= '0' )) {
      localStorage.clear();
      window.location.href = '/';
      this.auth.getHomePageValue({}).subscribe((res:tokendata)=>{
        if (res.status == 1) {
          this.totalBooking = this.numberWithCommas(res.totalbooking);
          this.satisfied_customers = this.numberWithCommas(res.customer_count);
          this.customer_rating = this.numberWithCommas(res.customer_rating);
        }
      });
    }
  }
  letsGo(data, num) {
    const access = localStorage.getItem('access');
    if (access == 'cleaner') {
      if (num == '1') { this.postcodeErr1 = 'När du är inloggad som renare så att du inte kan boka en städare.'; }
      if (num == '2') { this.postcodeErr2 = 'När du är inloggad som renare så att du inte kan boka en städare.'; }
      if (num == '3') { this.postcodeErr3 = 'När du är inloggad som renare så att du inte kan boka en städare.'; }
      if (num == '4') { this.postcodeErr4 = 'När du är inloggad som renare så att du inte kan boka en städare.'; }
      if (num == '5') { this.postcodeErr5 = 'När du är inloggad som renare så att du inte kan boka en städare.'; }
      setTimeout(() => {
        this.postcodeErr1 = '';
        this.postcodeErr2 = '';
        this.postcodeErr3 = '';
        this.postcodeErr4 = '';
        this.postcodeErr5 = '';
      }, 3000);
      return false;
    }

    const numcheck = /^\d+$/;
    if (data.postcodeinput == '') {
      if (num == '1') { this.postcodeErr1 = 'Ange postnummer'; }
      if (num == '2') { this.postcodeErr2 = 'Ange postnummer'; }
      if (num == '3') { this.postcodeErr3 = 'Ange postnummer'; }
      if (num == '4') { this.postcodeErr4 = 'Ange postnummer'; }
      if (num == '5') { this.postcodeErr5 = 'Ange postnummer'; }
    } else {
      if(numcheck.test(data.postcodeinput) === false){
        if (num == '1') { this.postcodeErr1 = 'ange ett giltigt postnummer'; }
        if (num == '2') { this.postcodeErr2 = 'ange ett giltigt postnummer'; }
        if (num == '3') { this.postcodeErr3 = 'ange ett giltigt postnummer'; }
        if (num == '4') { this.postcodeErr4 = 'ange ett giltigt postnummer'; }
        if (num == '5') { this.postcodeErr5 = 'ange ett giltigt postnummer'; }
      } else {
        localStorage.setItem('postcode', data.postcodeinput);
        this.router.navigate(['/cleaners']);
      }
      setTimeout(() => {
        this.postcodeErr1 = '';
        this.postcodeErr2 = '';
        this.postcodeErr3 = '';
        this.postcodeErr4 = '';
        this.postcodeErr5 = '';
      }, 3000);
    }
  }

  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

}
