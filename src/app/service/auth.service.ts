import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };
  constructor(private httpAuth: HttpClient) {}
  // local
  // server = 'http://localhost:4007/';
  // develepment
  // server = 'http://78.46.210.25:4009/';
  // staging
  server =  'http://78.46.210.25:4007/';

  gerUserUrl: string = this.server + 'get_my_profile';
  tokenUrl: string = this.server + 'generate_access_token';
  userRegUrl: string = this.server + 'user_registration';
  acVerifyUrl: string = this.server + 'verify_account';
  loginUrl: string = this.server + 'login';
  logoutUrl: string = this.server + 'logout';
  forgotUrl: string = this.server + 'forgot_password';
  resetUrl: string = this.server + 'reset_password';
  regCleanerUrl: string = this.server + 'cleaner_reg_basic';
  cleanerDetailUrl: string = this.server + 'cleaner_reg_details';
  cleanerFinRegUrl: string = this.server + 'cleaner_reg_proficient';
  cleanerAccUpdtUrl: string = this.server + 'cleaner_update_profile';
  resendOtpUrl: string = this.server + 'resend_otp';
  cleanerAdditDetUrl: string =
    this.server + 'cleaner_update_additional_details';
  docDeleteUrl: string = this.server + 'document_delete';
  getSrvsFeeUrl: string = this.server + 'get_bringclean_variables';
  cleanerPayoutUpdateUrl: string = this.server + 'cleaner_update_payouts';
  cleanerProChangeUrl: string = this.server + 'update_profile_pic';
  updateUserProfileUrl: string = this.server + 'user_update_profile';
  cleanersListUrl: string = this.server + 'cleaner_listing';
  viewprofileUrl: string = this.server + 'view_profile';
  getCardUrl: string = this.server + 'get_my_card_details';
  updateCardUrl: string = this.server + 'update_my_card_details';
  getWorkingHoursUrl: string = this.server + 'get_my_timeslots';
  setWorkingHoursUrl: string = this.server + 'update_my_timeslot';
  processBookingUrl: string = this.server + 'booking/proccess_to_book';
  confirmBookUrl: string = this.server + 'booking/booking_confirm';
  cleanerProfUpdateUrl: string =
    this.server + 'cleaner_update_personal_details';

  subscribeHitUrl: string = this.server + 'user_subscribe';

  GetNotificationUrl: string = this.server + 'notification/message_list';
  GetNotificationCountUrl: string = this.server + 'notification/message_count';
  RemoveNotificationCountUrl: string = this.server + 'notification/remove_bell_count';
  ReadNotificationStatusUrl: string = this.server + 'notification/read';

  getQuetionsListUrl: string = this.server + 'getquetionslist';

  insertQuizAnswerUrl: string = this.server + 'updatequetionslist';

  getHomePageValueUrl: string = this.server + 'getHomePageValue';

  checkDiscountCodeUrl: string = this.server + 'checkDiscountCode';

  checkDiscountCodeUrlSrvs(data) {
    return this.httpAuth.post(this.checkDiscountCodeUrl, data,this.httpOptions);
  }

  getHomePageValue(data) {
    return this.httpAuth.post(this.getHomePageValueUrl, data,this.httpOptions);
  }

  addQuizAnsersList(data) {
    return this.httpAuth.post(this.insertQuizAnswerUrl, data,this.httpOptions);
  }

  getQuetionsList(data) {
    return this.httpAuth.post(this.getQuetionsListUrl, data,this.httpOptions);
  }

  getNotificationSrvs(data) {
    return this.httpAuth.post(this.GetNotificationUrl, data, this.httpOptions);
  }

  getNotificationCountSrvs(data) {
    return this.httpAuth.post(this.GetNotificationCountUrl, data, this.httpOptions);
  }
  removeNotificationCountSrvs(data) {
    return this.httpAuth.post(this.RemoveNotificationCountUrl, data, this.httpOptions);
  }

  readNotificationSrvs(data) {
    return this.httpAuth.post(this.ReadNotificationStatusUrl, data, this.httpOptions);
  }


  getUserSrvs(data) {
    return this.httpAuth.post(this.gerUserUrl, data, this.httpOptions);
  }

  getToken(data) {
    return this.httpAuth.post(this.tokenUrl, data, this.httpOptions);
  }

  userRegSrvs(data) {
    return this.httpAuth.post(this.userRegUrl, data, this.httpOptions);
  }

  acVerifySrvs(data) {
    return this.httpAuth.post(this.acVerifyUrl, data, this.httpOptions);
  }

  loginSrvs(data) {
    return this.httpAuth.post(this.loginUrl, data, this.httpOptions);
  }

  logoutSrv(data) {
    return this.httpAuth.post(this.logoutUrl, data, this.httpOptions);
  }

  forgotSrvs(data) {
    return this.httpAuth.post(this.forgotUrl, data, this.httpOptions);
  }

  resetSrvs(data) {
    return this.httpAuth.post(this.resetUrl, data, this.httpOptions);
  }

  regCleanerSrvs(data) {
    return this.httpAuth.post(this.regCleanerUrl, data, this.httpOptions);
  }

  cleanerDetailsSrvs(data) {
    return this.httpAuth.post(this.cleanerDetailUrl, data, this.httpOptions);
  }

  cleanerFinRegSrvs(data) {
    return this.httpAuth.post(this.cleanerFinRegUrl, data, this.httpOptions);
  }

  cleanerAccUpdtSrvs(data) {
    return this.httpAuth.post(this.cleanerAccUpdtUrl, data);
  }

  resendOtpSrvs(data) {
    return this.httpAuth.post(this.resendOtpUrl, data, this.httpOptions);
  }

  cleanerAdditionalSrvs(data) {
    return this.httpAuth.post(this.cleanerAdditDetUrl, data, this.httpOptions);
  }

  documentDeleteSrvs(data) {
    return this.httpAuth.post(this.docDeleteUrl, data, this.httpOptions);
  }

  getSrvsFeeSrvs(data) {
    return this.httpAuth.post(this.getSrvsFeeUrl, data, this.httpOptions);
  }

  updateCleanerPayoutSrvs(data) {
    return this.httpAuth.post(
      this.cleanerPayoutUpdateUrl,
      data,
      this.httpOptions
    );
  }

  updateCleanerProfileSrvs(data) {
    return this.httpAuth.post(this.cleanerProChangeUrl, data);
  }

  updateUserProfileSrvs(data) {
    return this.httpAuth.post(this.updateUserProfileUrl, data);
  }

  cleanerListingSrvs(data) {
    return this.httpAuth.post(this.cleanersListUrl, data);
  }

  viewProfileSrvs(data) {
    return this.httpAuth.post(this.viewprofileUrl, data);
  }

  getCardSrvs(data) {
    return this.httpAuth.post(this.getCardUrl, data);
  }

  updateCardSrvs(data) {
    return this.httpAuth.post(this.updateCardUrl, data);
  }

  getWorkingHoursSrvs(data) {
    return this.httpAuth.post(this.getWorkingHoursUrl, data);
  }

  setWorkingHoursSrvs(data) {
    return this.httpAuth.post(this.setWorkingHoursUrl, data);
  }

  processBookingSrvs(data) {
    return this.httpAuth.post(this.processBookingUrl, data);
  }

  confirmBookSrvs(data) {
    return this.httpAuth.post(this.confirmBookUrl, data);
  }

  cleanerProfUpdateSrvs(data) {
    return this.httpAuth.post(this.cleanerProfUpdateUrl, data);
  }
  subscribeUser(data) {
    return this.httpAuth.post(this.subscribeHitUrl, data);
  }
}
