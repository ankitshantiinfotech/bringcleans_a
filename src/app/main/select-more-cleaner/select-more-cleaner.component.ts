import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";
import { BookingService } from "../../service/booking.service";
import { tokendata } from "../home/variable";
import { AppGlobals } from "../../app.global";
@Component({
  selector: "app-select-more-cleaner",
  templateUrl: "./select-more-cleaner.component.html",
  styleUrls: ["./select-more-cleaner.component.scss"],
  providers: [AppGlobals]
})
export class SelectMoreCleanerComponent implements OnInit {
  bookings = [];
  cleaners = [];
  selected = [];
  checker = [];
  baseurl: any;
  success = true;
  error = true;
  successMsg = "";
  errorMsg = "";
  constructor(
    private router: Router,
    private auth: AuthService,
    private booking: BookingService,
    private base: AppGlobals
  ) {window.scrollTo(0, 0);}
  ngOnInit() {
    this.baseurl = this.base.baseAppUrl;
    const user = localStorage.getItem("uid");
    const accessToken = localStorage.getItem("access_token");
    const deviceId = localStorage.getItem("device_id");
    const deviceType = localStorage.getItem("device_type");
    const accessI = localStorage.getItem("access");
    const bookingId = localStorage.getItem("bookingId");
    const data = {
      base_url: this.base.baseAppUrl,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: "cleaner@user#2",
      access: accessI,
      access_token: accessToken,
      booking_id: bookingId
    };
    this.booking.getaddCleanSrvs(data).subscribe((res2: tokendata) => {
      if (res2.status == "2") {
        this.errorMsg = "Session timeout.";
        localStorage.clear();
        window.location.href = "/login";
      }
      this.cleaners = res2.data;
    });
  }
  openDialogDash1() {}
  addCleaners() {
    const user = localStorage.getItem("uid");
    const accessToken = localStorage.getItem("access_token");
    const deviceId = localStorage.getItem("device_id");
    const deviceType = localStorage.getItem("device_type");
    const accessI = localStorage.getItem("access");
    const bookingId = localStorage.getItem("bookingId");
    const data = {
      base_url: this.base.baseAppUrl,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: "cleaner@user#2",
      access: accessI,
      access_token: accessToken,
      booking_id: bookingId,
      cleaners_id: this.checker.join(),
      cleaners: JSON.stringify(this.selected)
    };
    this.booking.addMoreCleanersSrvs(data).subscribe((res: tokendata) => {
      if (res.status == "2") {
        this.errorMsg = "Session timeout.";
        localStorage.clear();
        window.location.href = "/login";
      }
      if (res.status) {
        this.success = false;
        this.successMsg = res.message;
        setTimeout(() => {
          this.success = true;
          this.successMsg = "";
        }, 3000);
      } else {
        this.error = false;
        this.errorMsg = res.message;
        setTimeout(() => {
          this.error = true;
          this.errorMsg = "";
        }, 3000);
      }
      window.scrollTo(0, 0);
    });
  }
  back() {
    localStorage.removeItem("bookingId");
    this.router.navigate(["/welcomeback"]);
  }
  selectCleaner(ids, names, profiles, priced) {
    const selected = {
      id: ids,
      price: priced,
      name: names,
      profile: profiles
    };
    if (!this.checker.includes(ids)) {
      this.checker.push(ids);
      this.selected.push(selected);
      document.getElementById("activebtn" + ids).classList.add("bg-gray");
      document.getElementById("activebtn" + ids).innerText = "Selected";
      document.getElementById("cleanersbox" + ids).classList.add("active");
    } else {
      const arrIndex = this.checker.indexOf(ids);
      document.getElementById("activebtn" + ids).classList.remove("bg-gray");
      document.getElementById("activebtn" + ids).innerText = "Select";
      document.getElementById("cleanersbox" + ids).classList.remove("active");
      this.checker.splice(arrIndex, 1);
      this.selected.splice(arrIndex, 1);
    }
  }
}
