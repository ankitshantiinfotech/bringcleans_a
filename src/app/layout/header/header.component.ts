import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	AuthService
} from "../../service/auth.service";
import {
  tokendata
} from '../../main/home/variable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  menuopen = false;
  logged=true;
  unlogged=true;
  logedin = false;
  show: boolean= true;
  detailsbm2d() {
    this.show = !this.show;
  }
  constructor(private router: Router,private auth: AuthService) {}
  ngOnInit() {

    if(!localStorage.getItem('uid')){
        this.logged=false;
        this.logedin= false;
      }
    else{
        this.unlogged=false;
        this.logedin= true;
      }


  }
  openmenu(){
    //this.menuoption = '<div class="home-menu-blue"></div>';
    this.menuopen = true;
  }

  closemenu(){
    this.menuopen = false;
  }

  logout(){
  //   alert('fd');
    var uid = localStorage.getItem('uid');
    var access_token = localStorage.getItem('access_token');
    var access = localStorage.getItem('access');
    var device_id = localStorage.getItem('device_id');
    var device_type = localStorage.getItem('device_type');
    var sendData = {access:access,device_id:device_id,access_token:access_token,api_key:'cleaner@user#2',device_type:device_type,uid:uid}

    this.auth.logoutSrv(sendData).subscribe((res:tokendata)=>{
        console.log(res);
        // if(res.status==1)
        // {
            localStorage.clear();
            this.menuopen = false;
            // this.router.navigate(['/']);
            window.location.href = "/";
        // }
    });
  }

  login(){
      this.router.navigate(['/login']);
  }

  cleanerPage(){
    this.router.navigate(['/cleaner-page']);
  }
  myaccount() {
    const access  = localStorage.getItem('access');
    if (access === 'user') {
      this.router.navigate(['/account-detaile-changing']);
    } else {
      this.router.navigate(['/cleaner-account-detaile']);
    }
  }
}
