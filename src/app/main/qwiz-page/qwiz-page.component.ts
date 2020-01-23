import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { Router } from '@angular/router';
import { AuthService } from "../../service/auth.service";
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';

@Component({
  selector: 'app-qwiz-page',
  templateUrl: './qwiz-page.component.html',
  styleUrls: ['./qwiz-page.component.scss'],
  providers: [ AppGlobals]
})
export class QwizPageComponent implements OnInit {
  profeci = 'native';
  error = '';
  qanda: any = [];
  qids: any = [];
  prev = null;
  current = 0;
  next = 1;
  answers: any = [];
  currentQuestion: any = [];
  qwizAnswer: any = [];
  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0); }

  ngOnInit() {
    if (localStorage.getItem('uid') !== null) {
      const userid = localStorage.getItem('uid');
      localStorage.setItem('reg_uid', userid);
    }
    if (localStorage.getItem('cleanerthank') === 'yes') {
      this.router.navigate(['/']);
    }
    // get all Quetions list
    const user = localStorage.getItem('reg_uid');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      api_key: 'coach@user#2',
      proficient_in_english : this.profeci,
      uid: user
    };
    this.auth.getQuetionsList(data).subscribe((res: tokendata) => {
      const ans = [];
      res.data.forEach(element => {
        const qans = element.answers.split(',');
        this.qids.push(element.id);
        this.qanda.push({
          id: element.id,
          que: element.quetion,
          answers: qans
        });
        this.qwizAnswer.push({ selectIndex: 0, qid: element.id, answer: '' });
      });
      this.currentQuestion = this.qanda[this.current];
      if (localStorage.getItem('qwizAnswers')) {
        this.qwizAnswer = JSON.parse(localStorage.getItem('qwizAnswers'));
        if(this.qwizAnswer[this.current].answer != '') {
          if (document.querySelector('.active') != null) {
            document.querySelector('.active').classList.remove('active');
          }
          setTimeout(() => {
            document.getElementById('native' + this.qwizAnswer[this.current].selectIndex).classList.add('active');
          }, 500);
        }
      }
    });
  }
  // add all Answer of quiz
  // addQuizAnsers() {
  //   const user = localStorage.getItem('reg_uid');
  //   const data = {
  //     base_url_server: this.baseUrl.baseAppUrl,
  //     base_url_client: this.baseUrl.baseAppUrlC,
  //     api_key: 'coach@user#2',
  //     uid: user,
  //     answerData: this.qwizAnswer
  //   };
  //   this.auth.addQuizAnsersList(data).subscribe((res: tokendata) => {
  //     console.log(res);
  //   });
  // }
  setProf(prof, ind, queid, curind, ans) {
    if (document.querySelector('.active') != null) {
      document.querySelector('.active').classList.remove('active');
    }
    document.getElementById('native' + ind).classList.add('active');
    this.qwizAnswer[curind] = {selectIndex: ind, qid: queid, answer: ans };
    localStorage.setItem('qwizAnswers', JSON.stringify(this.qwizAnswer));
  }
  finReg() {
    if (this.qwizAnswer[this.current].answer == '') {
      this.error = 'Välj ditt svar.';
      setTimeout(() => {
        this.error = '';
      }, 3000);
    } else {
      let len = this.qanda.length - 1;
      if (len == this.current) {
        const user = localStorage.getItem('reg_uid');
        const data = {
          base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
          api_key: 'coach@user#2',
          uid: user,
          answerData: this.qwizAnswer
        };
        this.auth.addQuizAnsersList(data).subscribe((res: tokendata) => {
          if (res.status == '2') {
            this.error = 'Session timeout.';
            localStorage.clear();
            window.location.href = '/login';
          }
          if (res.status) {
            localStorage.removeItem('qwizAnswers');
            this.router.navigate(['/thankyou-page']);
          } else {
            this.error = res.message;
          }
        });
      } else {
        this.current++;
        this.currentQuestion = this.qanda[this.current];

        this.qwizAnswer = JSON.parse(localStorage.getItem('qwizAnswers'));
        if(this.qwizAnswer[this.current].answer != '') {
          if (document.querySelector('.active') != null) {
            document.querySelector('.active').classList.remove('active');
          }
          setTimeout(() => {
            document.getElementById('native' + this.qwizAnswer[this.current].selectIndex).classList.add('active');
          }, 500);
        }
      }
    }
  }
  back() {
    if (this.current != 0) {
      this.current--;
      this.currentQuestion = this.qanda[this.current];
      this.qwizAnswer = JSON.parse(localStorage.getItem('qwizAnswers'));
      if (document.querySelector('.active') != null) {
        document.querySelector('.active').classList.remove('active');
      }
      setTimeout(() => {
        document.getElementById('native' + this.qwizAnswer[this.current].selectIndex).classList.add('active');
      }, 500);
    } else {
      this.router.navigate(['/reg-finish']);
    }
  }
}
