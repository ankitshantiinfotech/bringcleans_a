import { Component, OnInit } from "@angular/core";
import { AppGlobals } from "../../app.global";

@Component({
  selector: "app-terms-page",
  templateUrl: "./terms-page.component.html",
  styleUrls: ["./terms-page.component.scss"],
  providers: [AppGlobals]
})
export class TermsPageComponent implements OnInit {
  constructor(private baseUrl: AppGlobals) {window.scrollTo(0, 0);}
  logged = false;
  ngOnInit() {

    if(!localStorage.getItem('uid'))
        this.logged=false;
    else
        this.logged=true;
  }
}
