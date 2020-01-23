import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-faq-category-page',
  templateUrl: './faq-category-page.component.html',
  styleUrls: ['./faq-category-page.component.scss'],
  providers: [ AppGlobals]
})
export class FaqCategoryPageComponent implements OnInit {
  before = 'notlogged';
  postcodeErr1 = '';
  postcodeErr2 = '';
  zip = '';
  zip2 = '';
  constructor(
    private baseUrl: AppGlobals,
    private route: ActivatedRoute,
    private router: Router
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    if (localStorage.getItem('first_name')) {
      this.before = 'logged';
    }
  }
  letsGo2() {
    const access = localStorage.getItem('access');
    if (access == 'cleaner') {
      this.postcodeErr2 = 'Ange postnummer';
    } else {
      const numcheck = /^\d+$/;
      if (numcheck.test(this.zip2) === false) {
        this.postcodeErr2 = 'ange ett giltigt postnummer';
      } else {
        localStorage.setItem('postcode', this.zip2);
        this.router.navigate(['/cleaners']);
      }
    }
    setTimeout(() => {
      this.postcodeErr2 = '';
    }, 3000);
  }
}
