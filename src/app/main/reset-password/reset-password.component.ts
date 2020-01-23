import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";
import { tokendata } from "../home/variable";
import { AppGlobals } from "../../app.global";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  providers: [AppGlobals]
})
export class ResetPasswordComponent implements OnInit {
  codeErr = "";
  passwordErr = "";
  confirmPassErr = "";
  resetServerErr = "";
  emailMessageShow = true;
  resend = "";
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);}

  ngOnInit() {
    if (localStorage.getItem("forgot_email")) this.emailMessageShow = false;
    else this.router.navigate(["/login"]);

    setTimeout(() => {
      this.emailMessageShow = true;
    }, 3000);
  }

  reset(data) {
    if (
      data.code.trim() != "" &&
      data.password.trim() != "" &&
      data.confirm_password.trim() != ""
    ) {
      if (data.password.length >= 6) {
        if (data.password == data.confirm_password) {
          var access_token = localStorage.getItem("access_token");
          var access = localStorage.getItem("access");
          var device_id = localStorage.getItem("device_id");
          var forgot_email = localStorage.getItem("forgot_email");
          //var identity = data.identity;
          var sendData = {
            base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
            access: access,
            device_id: device_id,
            access_token: access_token,
            api_key: "cleaner@user#2",
            password: data.password,
            identity: forgot_email,
            device_type: 0,
            identity_type: "email",
            confirm_password: data.confirm_password,
            code: data.code
          };
          this.auth.resetSrvs(sendData).subscribe((res: tokendata) => {
            if (res.status == "2") {
              this.resetServerErr = "Session timeout.";
              localStorage.clear();
              window.location.href = "/login";
            }
            if (res.status == 1) {
              localStorage.removeItem("forgot_email");
              localStorage.setItem("resetPassSucess", "success");
              this.router.navigate(["/login"]);
            } else {
              if (res.message == "Invalid code") this.codeErr = res.message;
              else this.confirmPassErr = res.message;
            }
          });
        } else this.confirmPassErr = "Lösenorden stämmer inte överens";
      } else this.passwordErr = "Lösenordet måste vara minst sex tecken långt";
    } else {
      if (data.code.trim() == "")
        this.codeErr = "Vänligen ange återställningskoden";
      if (data.password.trim() == "")
        this.passwordErr = "Ange ett nytt lösenord";
      if (data.confirm_password.trim() == "")
        this.confirmPassErr = "Lösenorden stämmer inte överens";
    }

    setTimeout(() => {
      this.codeErr = "";
      this.passwordErr = "";
      this.confirmPassErr = "";
    }, 3000);
  }

  resendotp() {
    const identityUser = localStorage.getItem("forgot_email");
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      api_key: "cleaner@user#2",
      identity: identityUser,
      otp_for: "forgot_password"
    };
    this.auth.resendOtpSrvs(data).subscribe((res: tokendata) => {
      if (res.status == "2") {
        this.resetServerErr = "Session timeout.";
        localStorage.clear();
        window.location.href = "/login";
      }

      this.resend = res.message;
      setTimeout(() => {
        this.resend = "";
      }, 3000);
    });
  }
}
