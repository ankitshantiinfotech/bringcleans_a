import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	AuthService
} from "../../service/auth.service";
import {
  tokendata
} from '../../main/home/variable';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {
  logged=true;
  unlogged=true;
  constructor(private router: Router,private auth: AuthService) {}
  ngOnInit() {
    
    if(!localStorage.getItem('uid'))
        this.logged=false;
    else
        this.unlogged=false;
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
              // this.router.navigate(['/']);
              window.location.href = "/";
          // }
      });
    }

}
