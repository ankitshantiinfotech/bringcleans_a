import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../service/auth.service";
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ AppGlobals]
})
export class ForgotPasswordComponent implements OnInit {
  identityErr ="";
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0); }


  ngOnInit() {
  }

  forgot(data)
  {
    // var identityInput =data.identity;
    // var identityInput =data.identity.trim();


    if(data.identity.trim() ==''){

      this.identityErr='Ange en e-post adress';

    }else if(data.identity.trim() !=''){

        var emailcheck = this.ValidateEmail(data.identity);
        if(emailcheck == true){

          var access_token = localStorage.getItem('access_token');
          var access = localStorage.getItem('access');
          var device_id = localStorage.getItem('device_id');
          var identity = data.identity;
          var sendData = {
            base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
            access:access,
            device_id:device_id,
            access_token:access_token,
            api_key:'cleaner@user#2',
            password:data.password,
            identity:identity,
            device_type:0
          }
            this.auth.forgotSrvs(sendData).subscribe((res:tokendata)=>{
              console.log(res);
              if(res.status==1){

                  localStorage.setItem("forgot_email",data.identity);
                  this.router.navigate(['/reset-password']);
              }else{

                  this.identityErr = res.message;
              }

         });

      }else this.identityErr='Ange en giltig e-post adress';

    }


    setTimeout(()=>{
         this.identityErr='';

     },3000);
  }

  ValidateEmail(inputText)
  {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(inputText.match(mailformat))
          return true;
      else
         return false;

  }
}
