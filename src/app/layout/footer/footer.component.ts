import { Component, OnInit } from '@angular/core';
import { FrontEndLogoutComponent } from '../front-end-logout/front-end-logout.component';
import {	AuthService } from "../../service/auth.service";
import { tokendata } from '../../main/home/variable';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  today = new Date();

     user = localStorage.getItem('uid');
     accessToken = localStorage.getItem('access_token');
     deviceId = localStorage.getItem('device_id');
     deviceType = localStorage.getItem('device_type');
     accessI = localStorage.getItem('access');
   
  subscribeMail = '';
  subscribeMailErr = '';
  subscribeMailSuccess = '';

  constructor(
    private auth: AuthService    
) { }

  ngOnInit() {
  }

  submitSubscribe(){
         
    if(this.subscribeMail==''){
      this.subscribeMailErr = 'E-post krävs.';
      return false;
    }else if(!this.subscribeMail.match(/[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9A-Z](?:[a-z0-9A-Z]*[a-z0-9A-Z])?\.)+[a-z0-9A-Z](?:[a-z0-9A-Z]*[a-z0-9A-Z])?/)){ 
      this.subscribeMailErr = 'Ogiltig e-postadress.';  
      return false;
    }else this.subscribeMailErr = '';  

    const InsertData = {
      device_id: this.deviceId,
      device_type: this.deviceType,
      api_key: 'cleaner@user#2',
      access: this.accessI,
      access_token: this.accessToken,
      uid: this.user!=null?this.user:0,
      subscribeMail: this.subscribeMail        
    };
      
          this.auth.subscribeUser(InsertData).subscribe((res: tokendata) => {
          
            
                  if(res.status){
                    this.subscribeMail = '';
                    this.subscribeMailErr = '';
                    this.subscribeMailSuccess = 'Tack! Vi hör av oss när vi har något spännande att berätta.';
                  }else{
                   
                    this.subscribeMailErr = 'något gick fel.';

                  }
                  setInterval (() => {
                    this.subscribeMailSuccess = '';
                  }, 3000)


            });
  
  }

}
