import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.global';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
  providers: [ AppGlobals]
})
export class FaqPageComponent implements OnInit {
  before = 'notlogged';
  type = '';
  faqTitle = '';
  faqs: any;
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
    if (localStorage.getItem('first_name')) {
      this.before = 'logged';
    }
  }


  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
    if (this.type == 'useraccount') {
      this.faqTitle = 'Mitt användarkonto';
      this.faqs = [
        {
          title: 'Behöver jag göra något innan min städare anländer?',
          text: 'Du behöver tillhandahålla allt material som städaren kan tänkas behöva när denne anländer till din bostad så att städaren kan göra ett bra jobb. Om du saknar material så kan du enkelt beställa detta via BringClean så skickar vi hem miljövänliga material så att du har det ni behöver. Värdesaker bör låsas in då BringClean ej ansvarar för dessa.'
        }, {
          title: 'Behöver jag vara hemma vid bokningen?',
          text: 'Många kunder har inte möjlighet att vara hemma och ta emot städaren pga arbete, skola eller liknande och då löser du detta med städaren direkt i chatten. Ni kommer överrens om hur städaren ska få access till ditt hem genom att t.ex. hämta nyckel hos granne, få en tillfällig kod om ni har ett kodlås eller liknande. Vi brukar uppmuntra våra kunder att vara hemma första gången i alla fall så att ni får träffas personligen och du kan ge instruktioner till städaren på plats. Det brukar uppskattas av båda parter.'
        }
      ];
    } else if (this.type == 'booking') {
      this.faqTitle = 'Att placera min bokning';
      this.faqs = [
        {
          title: 'HUR MYCKET KOSTNADER RENGÖRANDE TJÄNSTER?',
          text: 'Det beror på! Med Bring Cleans fastställer alla egenföretagare sina egna priser per timme. Som kund kan du välja önskat prisintervall och endast leverantörer som matchar din prisklass kan acceptera ditt erbjudande.'
        }, {
          title: 'VAD DAGAR OCH TIDER KAN JAG STÄLLA EN BOKNING?',
          text: 'Du kan lämna in en begäran för varje veckodag att börja mellan 07:00 och 19:00. Eftersom städare alla är egenföretagare och vi inte kan garantera deras tillgänglighet, kommer du bara att kunna göra en förfrågan 48 timmar i förväg för att förbättra dina chanser att få en renare bekräftad.'
        }
      ];
    } else if (this.type == 'bookingmanagement') {
      this.faqTitle = 'Bokningshantering';
      this.faqs = [
        {
          title: 'MÅSTE jag betala en avbokningsavgift när jag vill avboka en bokning?',
          text: 'Om du avbokar mindre än 48 timmar före din nästa bokning, debiteras du en sen avbokningsavgift. Avbokningar upp till 48 timmar innan din bokning kommer att vara gratis.\n För avbokningar mellan 24 och 48 timmar före ditt möte gäller en avgift på 25% av priset. \nFör avbokningar mellan 12 och 24 timmar före ditt möte gäller 50% av priset. \nOm avbokningen görs mindre än 12 timmar före rengöringsevenemanget kan din städare debitera hela priset för den överenskomna städtjänsten.'
        }, {
          title: 'Hur kan jag avbryta min regelbundna bokning?',
          text: 'För att avbryta din vanliga bokning, logga in på ditt konto och klicka sedan på "Hantera" och sedan på "Avbryt bokning" och sedan på "Fortsätt till avbokning". Om du avbokar med mindre än 48 timmars varsel meddelas du eventuella avbokningsavgifter innan du klickar på den slutliga avbokningsknappen\nDu måste välja det lämpligaste skälet för din avbokning och du måste också skriva en kort kommentar.\nOm du avbokar med mindre än 48 timmars varsel debiteras du en sen avbokningsavgift:\nAvbokningar upp till 48 timmar innan ditt möte är gratis.\nFör avbokningar mellan 24 och 48 timmar före ditt möte gäller en avgift på 25% av priset.\nFör avbokningar mellan 12 och 24 timmar före ditt möte gäller 50% av priset.\nOm avbokningen görs mindre än 12 timmar före rengöringsevenemanget kan din städare debitera hela priset för den överenskomna städtjänsten.'
        }
      ];
    } else if (this.type == 'appointment') {
      this.faqTitle = 'Min möte';
      this.faqs = [
        {
          title: 'VAD INKLUDERAR REN?',
          text: 'De uppgifter du vill att din städare ska utföra beror helt på vad du diskuterar och håller med din städare. Vi rekommenderar att du tillhandahåller en checklista med de uppgifter du vill ha utfört för varje rum för att din städare ska kunna arbeta igenom. Eftersom varje lägenhet är unik och varje kund har individuella önskemål, rekommenderar vi också att du i början av den första bokningen markerar alla problemområden som du vill att din städare ska vara uppmärksam på.'
        }, {
          title: 'Måste jag ge rengöringsmaterial?',
          text: 'Ja, alla rengöringsmaterial (svampar, lösningar, tvättmedel etc.) och utrustning (dammsugare, moppar och hinkar etc) ska tillhandahållas av kunden. Använd meddelanden verktyget för att ta reda på din rengöringsmedel vilken typ av material de skulle behöva.'
        }
      ];
    } else if (this.type == 'payments') {
      this.faqTitle = 'Mina betalningar';
      this.faqs = [
        {
          title: 'Hur fungerar prissättningen?',
          text: 'Vi har en väldigt transparent prissättning där du som kund direkt ser vad timpriset hos respektive städare är. Städarna sätter själva sina timpriser och du kan anlita städare som motsvarar dina krav och din budget. Alla priser i systemet anges efter RUT-avdrag och det är upp till dig som kund att se till att du är berättigad till RUT-avdrag. I annat fall debiteras du den kostnaden enligt avtalsvillkoren.'
        }, {
          title: 'NÄR VAR JAG LADDA?',
          text: 'Vi råder städarna att begära betalning så snart som möjligt efter rengöringen, men det kan ta några dagar efter bokningen.'
        }
      ];
    } else if (this.type == 'provider') {
      this.faqTitle = 'Hjälp som leverantör';
      this.faqs = [
        {
          title: 'Jag är inte nöjd / Min städare dök inte upp',
          text: 'Om något skulle gå fel så kontaktar du bara oss så fort som möjligt, dock senast 24 timmar efter det att uppdraget påbörjats. Vi låser då utbetalningen till den berörda städaren till dess att ärendet har utretts (vilket brukar gå väldigt snabbt). Återbetalning av hela eller delar av summan till dig som köpare kan bli aktuellt varpå vi då krediterar ditt konto så att du kan använda pengarna till att boka en ny städare på BringClean.'
        }, {
          title: 'Vad är BringClean?',
          text: 'BringClean är en plattform som underlättar för dig som behöver hjälp med hemstädning och andra RUT-tjänster. På plattformen hittar du personal som kan komma hem till dig och städa när det passar dig. Trygghet för både köpare och städare är av största vikt för oss på BringClean och alla städare som du hittar på plattformen har gått igenom bakgrundskontroller och intervjuer innan de tillåts buda på uppdrag.'
        }
      ];
    } else {
      this.faqTitle = '';
      this.faqs = [];
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
