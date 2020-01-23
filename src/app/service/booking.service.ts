import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };
  constructor(private http: HttpClient) {}
  // server = 'http://localhost:4007/';
  // develepment
  // server = 'http://78.46.210.25:4009/';
  // staging
  server = 'http://78.46.210.25:4007/';

  getBookingListUrl: string = this.server + 'booking/pending_list';
  getCleanerReqListUrl: string = this.server + 'booking/request_list';
  acceptBookingUrl: string = this.server + 'booking/request_accept';
  rejectBookingUrl: string = this.server + 'booking/request_reject';
  getAllListUrl: string = this.server + 'booking/listing';
  getBookDetailsUrl: string = this.server + 'booking/details';
  addCleanUrl: string = this.server + 'add_cleaner_listing';
  addMoreCleanersUrl: string = this.server + 'booking/add_cleaners';
  changeActionUrl: string = this.server + 'booking/action';
  cancelThisUrl: string = this.server + 'cancel_this_booking';
  cancelAllUrl: string = this.server + 'cancel_all_booking';
  raiseDisputeUrl: string = this.server + 'raise_a_dispute';
  getLossUrl: string = this.server + 'payment_loss_on_cancel';

  chatHistoryUrl: string = this.server + 'chat/specific';
  sendChatMessageUrl: string = this.server + 'chat/send_msg';
  chatCronUrl: string = this.server + 'chat/cronjob';

  feedbackPageDetailUrl: string = this.server + 'rating/cleaner_info';
  saveReviewRatingUrl: string = this.server + 'rating/submit';

  mycleanerUrl: string = this.server + 'booking/my_cleaners';
  mycleanerProfileUrl: string = this.server + 'booking/cleaners_details';

  saveRatingReview(data) {
    return this.http.post(this.saveReviewRatingUrl, data);
  }

  feedbackPageDetail(data) {
    return this.http.post(this.feedbackPageDetailUrl, data);
  }

  getChatCronData(data) {
    return this.http.post(this.chatCronUrl, data);
  }

  getChatHistory(data) {
    return this.http.post(this.chatHistoryUrl, data);
  }

  postChatMessage(data) {
    return this.http.post(this.sendChatMessageUrl, data);
  }

  getBookingListSrvs(data) {
    return this.http.post(this.getBookingListUrl, data);
  }
  getCleanerReqListSrvs(data) {
    return this.http.post(this.getCleanerReqListUrl, data);
  }
  getAllListSrvs(data) {
    return this.http.post(this.getAllListUrl, data);
  }
  acceptBookingSrvs(data) {
    return this.http.post(this.acceptBookingUrl, data);
  }
  rejectBookingSrvs(data) {
    return this.http.post(this.rejectBookingUrl, data);
  }
  getBookDetailsSrvs(data) {
    return this.http.post(this.getBookDetailsUrl, data);
  }
  getaddCleanSrvs(data) {
    return this.http.post(this.addCleanUrl, data);
  }
  addMoreCleanersSrvs(data) {
    return this.http.post(this.addMoreCleanersUrl, data);
  }
  changeActionSrvs(data) {
    return this.http.post(this.changeActionUrl, data);
  }
  cancelThisSrvs(data) {
    return this.http.post(this.cancelThisUrl, data);
  }
  cancelAllSrvs(data) {
    return this.http.post(this.cancelAllUrl, data);
  }
  raiseDisputeSrvs(data) {
    return this.http.post(this.raiseDisputeUrl, data);
  }
  getLossSrvs(data) {
    return this.http.post(this.getLossUrl, data);
  }
  mycleanerSrvs(data) {
    return this.http.post(this.mycleanerUrl, data);
  }
  mycleanerProfileSrvs(data) {
    return this.http.post(this.mycleanerProfileUrl, data);
  }
}
