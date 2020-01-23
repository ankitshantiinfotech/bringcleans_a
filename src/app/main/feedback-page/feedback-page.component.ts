import { Component, OnInit, ɵConsole } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { BookingService } from '../../service/booking.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss'],
  providers: [ AppGlobals]
})
export class FeedbackPageComponent implements OnInit {

  private activatedRouteSubscription: Subscription;
  BookingDetailId = '';
  BookingId = '';
  CleanerInfo: any = [];
  user = localStorage.getItem('uid');
  accessToken = localStorage.getItem('access_token');
  deviceId = localStorage.getItem('device_id');
  deviceType = localStorage.getItem('device_type');
  accessI = localStorage.getItem('access');
  quality_rate = 0;
  reliability_rate = 0;
  friendliness_rate = 0 ;
  review = '';
  review_for_cleaner='';
  Quality_rateErr = false;
  Reliability_rateErr = false;
  Friendliness_rateErr = false;
  ReviewErr = false;
  Review_for_cleanerErr = false;
  saveRatingErr = false;
  saveRatingErrMsg = '';
  saveSucErr = false;
  saveRatingSucMsg = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private booking: BookingService,
    private router: Router,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0); }
  ngOnInit() {
    // Get Booking Detail Id from url
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((p) =>{
           const params: any = p;
           this.BookingDetailId = params['BookingDetailId'];
           this.BookingId = params['BookingId'];
     }, (err) => {
       console.error(err);
     });
    /* cleaner detail */
    const WhereData = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      device_id: this.deviceId,
      device_type: this.deviceType,
      api_key: 'cleaner@user#2',
      access: this.accessI,
      access_token: this.accessToken,
      uid: this.user,
      booking_detail_id: this.BookingDetailId
    };
    // console.log(WhereData);
    this.booking.feedbackPageDetail(WhereData).subscribe((res: tokendata) => {
      if (res.data) {
        this.CleanerInfo = res.data;
      }
    });

  }

  saveRating() {
    let tokan = true;
    if (this.quality_rate <= 0) {
      tokan = false;
      this.Quality_rateErr = true;
    }
    if (this.reliability_rate <= 0) {
      tokan = false;
      this.Reliability_rateErr = true;
    }
    if (this.friendliness_rate <= 0) {
      tokan = false;
      this.Friendliness_rateErr = true;
    }
    if (this.review == ''){
      tokan = false;
      this.ReviewErr = true;
    }
    if (this.review_for_cleaner == '') {
      tokan = false;
      this.Review_for_cleanerErr = true;
    }
    if (tokan) {
      const Data = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        device_id: this.deviceId,
        device_type: this.deviceType,
        api_key: 'cleaner@user#2',
        access: this.accessI,
        access_token: this.accessToken,
        uid: this.user,
        booking_id: this.BookingId,
        booking_detail_id: this.BookingDetailId,
        quality_rate: this.quality_rate,
        reliability_rate: this.reliability_rate,
        friendliness_rate: this.friendliness_rate,
        review: this.review,
        review_for_cleaner: this.review_for_cleaner
      };
      // console.log(WhereData);
      this.booking.saveRatingReview(Data).subscribe((res: tokendata) => {
        if (res.status ) {
          this.saveRatingErr = false;
          this.saveRatingErrMsg = '';
          this.saveSucErr = true;
          this.saveRatingSucMsg = 'Din recension skickas in.';
          this.router.navigate(['/day-info']);
        } else {
          this.saveRatingErr = true;
          this.saveRatingErrMsg = res.message;
        }
      });
    }
  }

  removeErr(sec) {
    if (sec == 'ReviewErr') {
      this.ReviewErr = false;
    }
    if (sec == 'Review_for_cleanerErr') {
      this.Review_for_cleanerErr = false;
    }
  }
  onRateQuality_rate($event: {
    oldValue: number,
    newValue: number,
    starRating: StarRatingComponent
  }) {
    this.quality_rate = $event.newValue;
    this.Quality_rateErr = false;
  }
  onRateReliability_rate($event: {
    oldValue: number,
    newValue: number,
    starRating: StarRatingComponent
  }) {
    this.reliability_rate = $event.newValue;
    this.Reliability_rateErr = false;
  }
  onRateFriendliness_rate($event: {
    oldValue: number,
    newValue: number,
    starRating: StarRatingComponent
  }) {
    this.friendliness_rate = $event.newValue;
    this.Friendliness_rateErr = false;
  }

}
