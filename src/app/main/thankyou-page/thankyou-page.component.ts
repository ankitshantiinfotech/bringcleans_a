import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	AuthService
} from "../../service/auth.service";
import {
  tokendata
} from '../../main/home/variable';
import { AppGlobals } from "../../app.global";

@Component({
  selector: "app-thankyou-page",
  templateUrl: "./thankyou-page.component.html",
  styleUrls: ["./thankyou-page.component.scss"],
  providers: [AppGlobals]
})
export class ThankyouPageComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);}

  ngOnInit() {
    const id = localStorage.getItem("reg_uid");
    localStorage.setItem("uid", id);
    localStorage.removeItem("reg_uid");
    localStorage.removeItem("final");
    localStorage.setItem("cleanerthank", "yes");
  }

  logout() {
    //   alert('fd');
    var uid = localStorage.getItem("uid");
    var access_token = localStorage.getItem("access_token");
    var access = localStorage.getItem("access");
    var device_id = localStorage.getItem("device_id");
    var device_type = localStorage.getItem("device_type");
    var sendData = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      access: access,
      device_id: device_id,
      access_token: access_token,
      api_key: "cleaner@user#2",
      device_type: device_type,
      uid: uid
    };

    this.auth.logoutSrv(sendData).subscribe((res: tokendata) => {
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
