import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDeAt from '@angular/common/locales/sv';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatListModule,
  MatDatepickerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RatingModule } from 'ng-starrating';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { NgSelect2Module } from 'ng-select2';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './main/home/home.component';
import { AccountDetailComponent } from './main/account-detail/account-detail.component';
import { EmailVerifyNotificationDialog } from './main/account-detail/account-detail.component';
import { EmailVerifyNotificationDialogONlogin } from './main/login-page/login-page.component';
import { CleanerRegVerifyNotificationDialog } from './main/register-page/register-page.component';
import { AccountYourDetailComponent } from './main/account-your-detail/account-your-detail.component';
import { AccountPaymentDetaileComponent } from './main/account-payment-detaile/account-payment-detaile.component';
import { LoginHeaderComponent } from './layout/login-header/login-header.component';
import { AfterLoginHeaderComponent } from './layout/after-login-header/after-login-header.component';
import { FrontEndLogoutComponent } from './layout/front-end-logout/front-end-logout.component';
import { BeforeLoginFooterComponent } from './layout/before-login-footer/before-login-footer.component';
import { AfterLoginFooterComponent } from './layout/after-login-footer/after-login-footer.component';
import { EmplDashboardComponent } from './main/empl-dashboard/empl-dashboard.component';
import { DialogContentExampleDialog } from './main/empl-dashboard/empl-dashboard.component';
import { RegCleanerComponent } from './main/reg-cleaner/reg-cleaner.component';
import { LoginPageComponent } from './main/login-page/login-page.component';
import { RegisterPageComponent } from './main/register-page/register-page.component';
import { RegFinishComponent } from './main/reg-finish/reg-finish.component';
import { QwizPageComponent } from './main/qwiz-page/qwiz-page.component';
import { MypayoutComponent } from './main/mypayout/mypayout.component';
import { ChatComponent } from './main/chat/chat.component'; /*thise page delete*/
import { AccountDetaileChangingComponent } from './main/account-detaile-changing/account-detaile-changing.component';
import { UpdateCardDetaileModal } from './main/account-detaile-changing/account-detaile-changing.component';
import { ChangingWichCleanderModal } from './main/account-detaile-changing/account-detaile-changing.component';
import { BookingCenceledComponent } from './main/booking-cenceled/booking-cenceled.component';
import { SelectMoreCleanerComponent } from './main/select-more-cleaner/select-more-cleaner.component';
import { FutureBookingNotificationComponent } from './main/future-booking-notification/future-booking-notification.component';
import { HowItWorksComponent } from './main/how-it-works/how-it-works.component';
import { TermsPageComponent } from './main/terms-page/terms-page.component';
import { Pricing2PageComponent } from './main/pricing2-page/pricing2-page.component';
import { CleanerAccountDetaileComponent } from './main/cleaner-account-detaile/cleaner-account-detaile.component';
import { WorkingHourseComponent } from './main/working-hourse/working-hourse.component';
import { FeedbackPageComponent } from './main/feedback-page/feedback-page.component';
import { HelpPageComponent } from './main/help-page/help-page.component';
import { RequestSendComponent } from './main/request-send/request-send.component';
import { ResetPasswordComponent } from './main/reset-password/reset-password.component';
import { ChangePasswordComponent } from './main/change-password/change-password.component';
import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { CleanerDayComponent } from './main/cleaner-day/cleaner-day.component';
import { CleanerMyTransfersComponent } from './main/cleaner-my-transfers/cleaner-my-transfers.component';
import { PaymentHistoryComponent } from './main/payment-history/payment-history.component';
import { FutureBookingsComponent } from './main/future-bookings/future-bookings.component';
import { DayInfoComponent,BookingCencelPopup,DusputePopup,DayInfoCom } from './main/day-info/day-info.component';
import { CleanerFutureBookingsComponent } from './main/cleaner-future-bookings/cleaner-future-bookings.component';
import { MyCleanerComponent } from './main/my-cleaner/my-cleaner.component';
import { CleanerProfileComponent } from './main/cleaner-profile/cleaner-profile.component';
import { ThankyouPageComponent } from './main/thankyou-page/thankyou-page.component';
import { OfferComponent,ComformBookingPopup,CencelBookingPopup } from './main/offer/offer.component';
import { WelcomebackComponent } from './main/welcomeback/welcomeback.component';
import { UpdateDetailCleanerComponent } from './main/update-detail-cleaner/update-detail-cleaner.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { CookiePageComponent } from './main/cookie-page/cookie-page.component';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy.component';
import { AboutPageComponent } from './main/about-page/about-page.component';
import { FaqPageComponent } from './main/faq-page/faq-page.component';
import { FaqCategoryPageComponent } from './main/faq-category-page/faq-category-page.component';

import { MatPaginatorModule } from '@angular/material';
import { HeaderBlueComponent } from './layout/header-blue/header-blue.component';

registerLocaleData(localeDeAt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountDetailComponent,
    AccountYourDetailComponent,
    AccountPaymentDetaileComponent,
    LoginHeaderComponent,
    AfterLoginHeaderComponent,
    FrontEndLogoutComponent,
    BeforeLoginFooterComponent,
    AfterLoginFooterComponent,
    EmplDashboardComponent,
    DialogContentExampleDialog,
    RegCleanerComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RegFinishComponent,
    QwizPageComponent,
    MypayoutComponent,
    ChatComponent, /*thise page delete*/
    AccountDetaileChangingComponent,
    UpdateCardDetaileModal,
    ChangingWichCleanderModal,
    EmailVerifyNotificationDialog,
    EmailVerifyNotificationDialogONlogin,
    CleanerRegVerifyNotificationDialog,
    BookingCenceledComponent,
    SelectMoreCleanerComponent,
    FutureBookingNotificationComponent,
    HowItWorksComponent,
    TermsPageComponent,
    Pricing2PageComponent,
    CleanerAccountDetaileComponent,
    WorkingHourseComponent,
    FeedbackPageComponent,
    HelpPageComponent,
    RequestSendComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    CleanerDayComponent,
    CleanerMyTransfersComponent,
    PaymentHistoryComponent,
    FutureBookingsComponent,
    DayInfoComponent,
    CleanerFutureBookingsComponent,
    MyCleanerComponent,
    CleanerProfileComponent,
    ThankyouPageComponent,
    BookingCencelPopup,
    DusputePopup,
    OfferComponent,
    ComformBookingPopup,
    CencelBookingPopup,
    DayInfoCom,
    WelcomebackComponent,
    UpdateDetailCleanerComponent,
    TimeAgoPipe,
    CookiePageComponent,
    PrivacyPolicyComponent,
    AboutPageComponent,
    FaqPageComponent,
    FaqCategoryPageComponent,
    HeaderBlueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatBadgeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    FlexLayoutModule,
    MatCheckboxModule,
    RatingModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    FullCalendarModule,
    CarouselModule,
    NgSelect2Module,
    GooglePlaceModule,
    MatPaginatorModule

  ],
  entryComponents: [
    DialogContentExampleDialog,
    UpdateCardDetaileModal,
    ChangingWichCleanderModal,
    EmailVerifyNotificationDialog,
    EmailVerifyNotificationDialogONlogin,
    CleanerRegVerifyNotificationDialog,
    BookingCencelPopup,
    ComformBookingPopup,
    CencelBookingPopup,
    DayInfoCom,
    DusputePopup
  ],
  providers: [MatNativeDateModule,
    { provide: LOCALE_ID, useValue: 'sv' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
