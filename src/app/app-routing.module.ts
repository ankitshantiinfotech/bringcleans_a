import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { AccountDetailComponent } from './main/account-detail/account-detail.component';
import { AccountYourDetailComponent } from './main/account-your-detail/account-your-detail.component';
import { AccountPaymentDetaileComponent } from './main/account-payment-detaile/account-payment-detaile.component';
import { EmplDashboardComponent } from './main/empl-dashboard/empl-dashboard.component';
import { RegCleanerComponent } from './main/reg-cleaner/reg-cleaner.component';
import { LoginPageComponent } from './main/login-page/login-page.component';
import { RegisterPageComponent } from './main/register-page/register-page.component';
import { RegFinishComponent } from './main/reg-finish/reg-finish.component';
import { QwizPageComponent } from './main/qwiz-page/qwiz-page.component';
import { MypayoutComponent } from './main/mypayout/mypayout.component';
import { ChatComponent } from './main/chat/chat.component'; /*thise page delete*/
import { AccountDetaileChangingComponent } from './main/account-detaile-changing/account-detaile-changing.component';
import { BookingCenceledComponent } from './main/booking-cenceled/booking-cenceled.component';
import { SelectMoreCleanerComponent } from './main/select-more-cleaner/select-more-cleaner.component';
import { FutureBookingNotificationComponent } from './main/future-booking-notification/future-booking-notification.component';
import { CleanerAccountDetaileComponent } from './main/cleaner-account-detaile/cleaner-account-detaile.component';
import { WorkingHourseComponent } from './main/working-hourse/working-hourse.component';
import { ResetPasswordComponent } from './main/reset-password/reset-password.component';
import { HowItWorksComponent } from './main/how-it-works/how-it-works.component';
import { TermsPageComponent } from './main/terms-page/terms-page.component';
import { Pricing2PageComponent } from './main/pricing2-page/pricing2-page.component';
import { FeedbackPageComponent } from './main/feedback-page/feedback-page.component';
import { HelpPageComponent } from './main/help-page/help-page.component';
import { RequestSendComponent } from './main/request-send/request-send.component';
import { ChangePasswordComponent } from './main/change-password/change-password.component';
import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { CleanerDayComponent } from './main/cleaner-day/cleaner-day.component';
import { CleanerMyTransfersComponent } from './main/cleaner-my-transfers/cleaner-my-transfers.component';
import { PaymentHistoryComponent } from './main/payment-history/payment-history.component';
import { FutureBookingsComponent } from './main/future-bookings/future-bookings.component';
import { DayInfoComponent } from './main/day-info/day-info.component';
import { CleanerFutureBookingsComponent } from './main/cleaner-future-bookings/cleaner-future-bookings.component';
import { MyCleanerComponent } from './main/my-cleaner/my-cleaner.component';
import { CleanerProfileComponent } from './main/cleaner-profile/cleaner-profile.component';
import { ThankyouPageComponent } from './main/thankyou-page/thankyou-page.component';
import { OfferComponent } from './main/offer/offer.component';
import { WelcomebackComponent } from './main/welcomeback/welcomeback.component';
import { UpdateDetailCleanerComponent } from './main/update-detail-cleaner/update-detail-cleaner.component';
import { CookiePageComponent } from './main/cookie-page/cookie-page.component';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy.component';
import { AboutPageComponent } from './main/about-page/about-page.component';
import { FaqPageComponent } from './main/faq-page/faq-page.component';
import { FaqCategoryPageComponent } from './main/faq-category-page/faq-category-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bookstep-1', component: AccountDetailComponent },
  { path: 'bookstep-2', component: AccountYourDetailComponent },
  { path: 'account-payment-detaile', component: AccountPaymentDetaileComponent },
  { path: 'cleaners', component: EmplDashboardComponent },
  { path: 'cleaner-page', component: RegCleanerComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'reg-cleaner', component: RegisterPageComponent },
  { path: 'reg-finish', component: RegFinishComponent },
  { path: 'qwiz-page', component: QwizPageComponent },
  { path: 'mypayout', component: MypayoutComponent },
  { path: 'chat', component: ChatComponent }, /*thise page delete*/
  { path: 'account-detaile-changing', component: AccountDetaileChangingComponent },
  { path: 'booking-cenceled', component: BookingCenceledComponent },
  { path: 'select-more-cleaner', component: SelectMoreCleanerComponent },
  { path: 'future-booking-notification', component: FutureBookingNotificationComponent },
  { path: 'cleaner-account-detaile', component: CleanerAccountDetaileComponent },
  { path: 'working-hourse', component: WorkingHourseComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'terms-page', component: TermsPageComponent },
  { path: 'pricing2-page', component: Pricing2PageComponent },
  { path     : 'feedback-page',
        children : [
                      { path     : ':BookingId',
                        children : [ { path     : ':BookingDetailId',component: FeedbackPageComponent}]
                      }
                   ]
  },
//  { path: 'feedback-page', component: FeedbackPageComponent },
  { path: 'help-page', component: HelpPageComponent },
  { path: 'request-send', component: RequestSendComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'cleaner-day', component: CleanerDayComponent },
  { path: 'cleaner-my-transfers', component: CleanerMyTransfersComponent },
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: 'future-bookings', component: FutureBookingsComponent },
  { path: 'day-info', component: DayInfoComponent },
  { path: 'day-info/:bookingid/:detailsid', component: DayInfoComponent },

  { path: 'cleaner-future-bookings', component: CleanerFutureBookingsComponent },
  { path: 'cleaner-profile', component: CleanerProfileComponent },
  { path: 'thankyou-page', component: ThankyouPageComponent },
  { path: 'my-cleaner', component: MyCleanerComponent },
  { path: 'offer', component: OfferComponent },
  { path: 'welcomeback', component: WelcomebackComponent },
  { path: 'update-detail-cleaner', component: UpdateDetailCleanerComponent },
  { path: 'cookies-page', component: CookiePageComponent },
  { path: 'privacy-page', component: PrivacyPolicyComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'faq-page/:type', component: FaqPageComponent },
  { path: 'faq-category-page', component: FaqCategoryPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
