import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	AuthService
} from "../../service/auth.service";
import {
  tokendata
} from '../../main/home/variable';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { AppGlobals } from '../../app.global';
import { MatSliderChange } from '@angular/material/slider';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-reg-cleaner',
  templateUrl: './reg-cleaner.component.html',
  styleUrls: ['./reg-cleaner.component.scss'],
  providers: [ AppGlobals]
})
export class RegCleanerComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  public options: Options;

  selected = '0';
  calculatedPrice = 600;
  calculatedvalue = 1;

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    if (localStorage.getItem('uid')) {
      this.router.navigate(['/']);
    }
    this.options = {
      multiple: false,
      theme: 'default',
      closeOnSelect: true,
    };


  }

  onInputChange(event: MatSliderChange) {
    console.log("This is emitted as the thumb slides");
    console.log(event.value);
    this.calculatedvalue = event.value;
    this.calculatedPrice = event.value * 150 * 4;
  }

  cleanerReg(){
      this.router.navigate(['/reg-cleaner']);
  }

}






