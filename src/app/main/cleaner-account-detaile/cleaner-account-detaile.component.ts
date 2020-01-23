import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { tokendata } from '../home/variable';
import { AppGlobals } from '../../app.global';
@Component({
  selector: 'app-cleaner-account-detaile',
  templateUrl: './cleaner-account-detaile.component.html',
  styleUrls: ['./cleaner-account-detaile.component.scss'],
  providers: [AppGlobals]
})
export class CleanerAccountDetaileComponent implements OnInit {
  success = true;
  updateAddress = '';
  successMsg = '';
  error = true;
  errMsg = '';
  errpass = true;
  workingUpdate = true;
  errpassMsg = '';
  erraboutmeMsg='';
  theCheckbox1 = false;
  theCheckbox2 = false;
  theCheckbox3 = false;
  theCheckbox4 = false;
  frontSrc: any = 'assets/images/upload-icon.png';
  backSrc: any = 'assets/images/upload-icon.png';
  accFrontSrc: any = 'assets/images/upload-icon.png';
  accBackSrc: any = 'assets/images/upload-icon.png';
  resFrontSrc: any = 'assets/images/upload-icon.png';
  resBackSrc: any = 'assets/images/upload-icon.png';
  frontFile: File = null;
  backFile: File = null;
  accFrontFile: File = null;
  accBackFile: File = null;
  resFrontFile: File = null;
  resBackFile: File = null;
  postaldata = '';
  radiusdata = '';
  checked = true;
  profiledata: any = {
    postal: '',
    address: '',
    radius: '',
    newPass: '',
    confNewPass: '',
    aboutme: ''
  };
  invalidfile = false;
  idfrontexist = false;
  idbackexist = false;
  acfrontexist = false;
  resfrontexist = false;
  invalidfront = '';
  invalidback = '';
  invalidacfront = '';
  invalidacback = '';
  invalidresfront = '';
  invalidresback = '';
  errpass2Msg = '';
  docavailable = true;
  profile = '0';
  count = '0';
  uploadocs = true;
  AdminApprovalErr = '';
  AdminApprovalErr1 = '';
  AdminApprovalErr2 = '';
  gglAddress = '';
  gglCity = '';
  gglState = '';
  gglCountry = '';
  gglZip = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    private baseUrl: AppGlobals
  ) {window.scrollTo(0, 0);}
  enter(e) {
    if (e.keyCode === 13) {
      document.getElementById('update').click();
    }
  }
  ngOnInit() {
    const user = localStorage.getItem('uid');
    const accessToken = localStorage.getItem('access_token');
    const deviceId = localStorage.getItem('device_id');
    const deviceType = localStorage.getItem('device_type');
    const accessI = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceId,
      device_type: deviceType,
      api_key: 'cleaner@user#2',
      access: accessI,
      access_token: accessToken
    };
    this.auth.getUserSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.status) {
        this.profile = res.data.profile_status;
        this.profiledata.postal = res.data.postcode;
        this.profiledata.address = res.data.adrs_num_n_street + " " + res.data.postcode;
        this.gglAddress = res.data.adrs_num_n_street + " " + res.data.postcode;
        this.gglZip = res.data.postcode;
        this.profiledata.radius = res.data.booking_offer_radius;
        this.profiledata.aboutme = res.data.about_me;
        this.profiledata.admin_approval = res.data.admin_approve_status;
        this.count = res.data.about_me.length;
        if(
          res.data.id_proof_front == '' ||
          res.data.id_proof_back == '' ||
          res.data.bank_ac_front == '' ||
          res.data.residence_proof_front == ''
        ) {
          this.uploadocs = false;
        }
        if (res.data.id_proof_front !== '') {
          const ext = res.data.id_proof_front.split('.')[1];
          if (ext === 'pdf' || ext === 'PDF') {
            this.frontSrc = 'assets/images/pdf_file.png';
          } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
            this.frontSrc = 'assets/images/word_file.png';
          } else {
            this.frontSrc =
            this.baseUrl.baseAppUrl +
            'uploads/documents/' +
            res.data.id_proof_front;
          }
          this.idfrontexist = true;
        }
        if (res.data.id_proof_back !== '') {
          const ext = res.data.id_proof_back.split('.')[1];
          if (ext === 'pdf' || ext === 'PDF') {
            this.backSrc = 'assets/images/pdf_file.png';
          } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
            this.backSrc = 'assets/images/word_file.png';
          } else {
            this.backSrc =
            this.baseUrl.baseAppUrl +
            'uploads/documents/' +
            res.data.id_proof_back;
          }
          this.idbackexist = true;
        }
        if (res.data.bank_ac_front !== '') {
          const ext = res.data.bank_ac_front.split('.')[1];
          if (ext === 'pdf' || ext === 'PDF') {
            this.accFrontSrc = 'assets/images/pdf_file.png';
          } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
            this.accFrontSrc = 'assets/images/word_file.png';
          } else {
            this.accFrontSrc =
            this.baseUrl.baseAppUrl +
            'uploads/documents/' +
            res.data.bank_ac_front;
          }
          this.acfrontexist = true;
        }
        if (res.data.residence_proof_front !== '') {
          const ext = res.data.residence_proof_front.split('.')[1];
          if (ext === 'pdf' || ext === 'PDF') {
            this.resFrontSrc = 'assets/images/pdf_file.png';
          } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
            this.resFrontSrc = 'assets/images/word_file.png';
          } else {
            this.resFrontSrc =
            this.baseUrl.baseAppUrl +
            'uploads/documents/' +
            res.data.residence_proof_front;
          }
          this.resfrontexist = true;
        }
        if (res.data.pets === 1) {
          this.theCheckbox1 = true;
        }
        if (res.data.ironing === 1) {
          this.theCheckbox2 = true;
        }
        if (res.data.available_on_another === 1) {
          this.theCheckbox3 = true;
        }
        if (res.data.windows === 1) {
          this.theCheckbox4 = true;
        }
        if (this.profile == '1') {
          this.auth.getWorkingHoursSrvs(data).subscribe((res2: tokendata) => {
            if (res.status == '2') {
              this.errMsg = 'Session timeout logging out.';
              localStorage.clear();
              window.location.href = '/login';
            }
            if (res2.data.length === 0) {
              this.workingUpdate = false;
            }
          });
        }
      }
    });
  }

  public handleAddressChange(address: any) {
    for (let comp of address.address_components) {
      if (comp.types[0] == 'sublocality_level_1') {
        this.gglAddress = comp.long_name;
      }
      if (comp.types[0] == 'administrative_area_level_2') {
        this.gglCity = comp.long_name;
      }
      if (comp.types[0] == 'administrative_area_level_1') {
        this.gglState = comp.long_name;
      }
      if (comp.types[0] == 'country') {
        this.gglState = comp.long_name;
      }
      if (comp.types[0] == 'postal_code') {
        this.gglZip = comp.long_name;
      }
    }
  }

  countchar() {
    this.erraboutmeMsg = '';
    if (this.profiledata.aboutme.length <= 300) { this.count  = this.profiledata.aboutme.length;
    } else { event.preventDefault(); }
  }
  // id proof front insert
  idfront(event) {
    const reader = new FileReader();
    const ext = event.target.files[0].name.split('.')[1];
    if (
      ext === 'png' ||
      ext === 'PNG' ||
      ext === 'jpg' ||
      ext === 'JPG' ||
      ext === 'jpeg' ||
      ext === 'JPEG' ||
      ext === 'pdf' ||
      ext === 'PDF' ||
      ext === 'doc' ||
      ext === 'DOC' ||
      ext === 'docx' ||
      ext === 'DOCX'
    ) {
      if (ext === 'pdf' || ext === 'PDF') {
        this.frontSrc = 'assets/images/pdf_file.png';
      } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
        this.frontSrc = 'assets/images/word_file.png';
      } else {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.frontSrc = reader.result;
        };
      }
      this.frontFile = event.target.files[0];
      this.idfrontexist = true;
    } else {
      this.invalidfront = 'Filformatet stöds inte.';
      this.invalidfile = true;
    }
  }
  frontRem() {
    this.frontSrc = 'assets/images/upload-icon.png';
    this.frontFile = null;
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const accessk = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceid,
      device_type: devicetype,
      api_key: apikey,
      access: accessk,
      access_token: accesstoken,
      document_type: 'id_proof_front'
    };
    this.auth.documentDeleteSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
    });
    this.idfrontexist = false;
  }
  // id proof back insert
  idback(event) {
    const reader = new FileReader();
    const ext = event.target.files[0].name.split('.')[1];
    if (
      ext === 'png' ||
      ext === 'PNG' ||
      ext === 'jpg' ||
      ext === 'JPG' ||
      ext === 'jpeg' ||
      ext === 'JPEG' ||
      ext === 'pdf' ||
      ext === 'PDF' ||
      ext === 'doc' ||
      ext === 'DOC' ||
      ext === 'docx' ||
      ext === 'DOCX'
    ) {
      if (ext === 'pdf' || ext === 'PDF' ) {
        this.backSrc = 'assets/images/pdf_file.png';
      } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
        this.backSrc = 'assets/images/word_file.png';
      } else {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.backSrc = reader.result;
        };
      }
      this.backFile = event.target.files[0];
      this.idbackexist = true;
    } else {
      this.invalidback = 'Filformatet stöds inte.';
      this.invalidfile = true;
    }
  }
  backRem() {
    this.backSrc = 'assets/images/upload-icon.png';
    this.backFile = null;
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const accessk = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceid,
      device_type: devicetype,
      api_key: apikey,
      access: accessk,
      access_token: accesstoken,
      document_type: 'id_proof_back'
    };
    this.auth.documentDeleteSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
    });
    this.idbackexist = false;
  }
  accFront(event) {
    const reader = new FileReader();
    const ext = event.target.files[0].name.split('.')[1];
    if (
      ext === 'png' ||
      ext === 'PNG' ||
      ext === 'jpg' ||
      ext === 'JPG' ||
      ext === 'jpeg' ||
      ext === 'JPEG' ||
      ext === 'pdf' ||
      ext === 'PDF' ||
      ext === 'doc' ||
      ext === 'DOC' ||
      ext === 'docx' ||
      ext === 'DOCX'
    ) {
      if (ext === 'pdf' || ext === 'PDF') {
        this.accFrontSrc = 'assets/images/pdf_file.png';
      } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
        this.accFrontSrc = 'assets/images/word_file.png';
      } else {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.accFrontSrc = reader.result;
        };
      }
      this.acfrontexist = true;
      this.accFrontFile = event.target.files[0];
    } else {
      this.invalidacfront = 'Filformatet stöds inte.';
      this.invalidfile = true;
    }

  }
  accfrontRem() {
    this.accFrontSrc = 'assets/images/upload-icon.png';
    this.accFrontFile = null;
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const accessk = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceid,
      device_type: devicetype,
      api_key: apikey,
      access: accessk,
      access_token: accesstoken,
      document_type: 'bank_ac_front'
    };
    this.auth.documentDeleteSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
    });
    this.acfrontexist = false;
  }
  accBack(event) {
    const reader = new FileReader();
    const ext = event.target.files[0].name.split('.')[1];
    if (
      ext === 'png' ||
      ext === 'PNG' ||
      ext === 'jpg' ||
      ext === 'JPG' ||
      ext === 'jpeg' ||
      ext === 'JPEG' ||
      ext === 'pdf' ||
      ext === 'PDF' ||
      ext === 'doc' ||
      ext === 'DOC' ||
      ext === 'docx' ||
      ext === 'DOCX'
    ) {
      if (ext === 'pdf' || ext === 'PDF') {
        this.accBackSrc = 'assets/images/pdf_file.png';
      } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
        this.accBackSrc = 'assets/images/word_file.png';
      } else {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.accBackSrc = reader.result;
        };
      }
      this.accBackFile = event.target.files[0];
    } else {
      this.invalidacback = 'Filformatet stöds inte.';
      this.invalidfile = true;
    }
  }
  accbackRem() {
    this.accBackSrc = 'assets/images/upload-icon.png';
    this.accBackFile = null;
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const accessk = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceid,
      device_type: devicetype,
      api_key: apikey,
      access: accessk,
      access_token: accesstoken,
      document_type: 'bank_ac_back'
    };
    this.auth.documentDeleteSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
    });
  }
  resFront(event) {
    const reader = new FileReader();
    const ext = event.target.files[0].name.split('.')[1];
    if (
      ext === 'png' ||
      ext === 'PNG' ||
      ext === 'jpg' ||
      ext === 'JPG' ||
      ext === 'jpeg' ||
      ext === 'JPEG' ||
      ext === 'pdf' ||
      ext === 'PDF' ||
      ext === 'doc' ||
      ext === 'DOC' ||
      ext === 'docx' ||
      ext === 'DOCX'
    ) {
      if (ext === 'pdf' || ext === 'PDF') {
        this.resFrontSrc = 'assets/images/pdf_file.png';
      } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
        this.resFrontSrc = 'assets/images/word_file.png';
      } else {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.resFrontSrc = reader.result;
        };
      }
      this.resFrontFile = event.target.files[0];
      this.resfrontexist = true;
    } else {
      this.invalidresfront = 'Filformatet stöds inte.';
      this.invalidfile = true;
    }
  }
  resfrontRem() {
    this.resFrontSrc = 'assets/images/upload-icon.png';
    this.resFrontFile = null;
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const accessk = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceid,
      device_type: devicetype,
      api_key: apikey,
      access: accessk,
      access_token: accesstoken,
      document_type: 'residence_proof_front'
    };
    this.auth.documentDeleteSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
    });
    this.resfrontexist = false;
  }
  resBack(event) {
    const reader = new FileReader();
    const ext = event.target.files[0].name.split('.')[1];
    if (
      ext === 'png' ||
      ext === 'PNG' ||
      ext === 'jpg' ||
      ext === 'JPG' ||
      ext === 'jpeg' ||
      ext === 'JPEG' ||
      ext === 'pdf' ||
      ext === 'PDF' ||
      ext === 'doc' ||
      ext === 'DOC' ||
      ext === 'docx' ||
      ext === 'DOCX'
    ) {
      if (ext === 'pdf' || ext === 'PDF') {
        this.resBackSrc = 'assets/images/pdf_file.png';
      } else if (ext === 'doc' || ext === 'DOC' || ext === 'docx' || ext === 'DOCX') {
        this.resBackSrc = 'assets/images/word_file.png';
      } else {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.resBackSrc = reader.result;
        };
      }
      this.resBackFile = event.target.files[0];
    } else {
      this.invalidresback = 'Filformatet stöds inte.';
      this.invalidfile = true;
    }

  }
  resbackRem() {
    this.resBackSrc = 'assets/images/upload-icon.png';
    this.resBackFile = null;
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const accessk = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceid,
      device_type: devicetype,
      api_key: apikey,
      access: accessk,
      access_token: accesstoken,
      document_type: 'residence_proof_back'
    };
    this.auth.documentDeleteSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
    });
  }
  updateDet() {

    const fd = new FormData();
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const access = localStorage.getItem('access');
    if (this.profiledata.aboutme == '') {
      this.erraboutmeMsg = 'Om mig krävs.';
      setTimeout(() => {
        this.erraboutmeMsg = '';
      }, 3000);
      return false;
    }
    if (this.profiledata.newPass !== '') {
      if (this.profiledata.newPass.length < 6) {
        this.profiledata.newPass = '';
        this.profiledata.confNewPass = '';
        this.errpass = false;
        this.errpassMsg = 'Lösenordet måste vara minst sex tecken långt.';
        setTimeout(() => {
          this.errpass = true;
          this.errpassMsg = '';
        }, 3000);
        return false;
      } else if (this.profiledata.newPass !== this.profiledata.confNewPass) {
        this.profiledata.confNewPass = '';
        this.errpass = false;
        this.errpass2Msg = 'Lösenorden matchar inte.';
        setTimeout(() => {
          this.errpass = true;
          this.errpassMsg = '';
        }, 3000);
        return false;
      } else {
        this.errpassMsg = '';
        this.errpass2Msg = '';
      }
    }
    if (this.idfrontexist === false) { this.invalidfront = 'Id handling Obligatoriskt'; }
    else { this.invalidfront = ''; }

    if (this.idbackexist === false) { this.invalidback = 'Id handling Obligatoriskt'; }
    else { this.invalidback = ''; }

    if (this.resfrontexist === false) { this.invalidresfront = 'Adressbevis Obligatoriskt'; }
    else { this.invalidresfront = ''; }
    if (this.acfrontexist === false) { this.invalidacfront = 'Bankkontoutdrag Obligatoriskt'; }
    else { this.invalidacfront = ''; }
    // this.docavailable = false;
    if (this.idbackexist === false || this.idfrontexist === false || this.resfrontexist === false || this.acfrontexist === false) {
      return false;
    }
    if (this.invalidfile === true) { return false; window.scrollTo(0, 0); }
    fd.append('base_url_server', this.baseUrl.baseAppUrl);
      fd.append('base_url_client', this.baseUrl.baseAppUrlC);
    fd.append('device_id', deviceid);
    fd.append('device_type', devicetype);
    fd.append('api_key', apikey);
    fd.append('access', access);
    fd.append('access_token', accesstoken);
    fd.append('uid', user);
    fd.append('postcode', this.gglZip);
    this.updateAddress = '';
    if (this.gglAddress != '') { this.updateAddress = this.updateAddress + this.gglAddress; }
    if (this.gglCity != '') { this.updateAddress = this.updateAddress + ' ' + this.gglCity; }
    if (this.gglState) { this.updateAddress = this.updateAddress + ', ' + this.gglState; }
    if (this.gglCountry) { this.updateAddress = this.updateAddress + ', ' + this.gglCountry; }
    fd.append('address', this.updateAddress);
    fd.append('booking_offer_radius', this.profiledata.radius);
    fd.append('about_me', this.profiledata.aboutme);
    fd.append('current_password', this.profiledata.newPass);
    fd.append('new_password', this.profiledata.confNewPass);
    fd.append('id_proof_front', this.frontFile);
    fd.append('id_proof_back', this.backFile);
    fd.append('bank_ac_front', this.accFrontFile);
    fd.append('bank_ac_back', this.accBackFile);
    fd.append('residence_proof_front', this.resFrontFile);
    fd.append('residence_proof_back', this.resBackFile);
    // this.auth.getZipCodes(this.gglZip, this.profiledata.radius).subscribe((res: tokendata) => {
    //   console.log(res);
    // });
    this.auth.cleanerAccUpdtSrvs(fd).subscribe((res: tokendata) => {
      if (res.status == '2') {
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.status === 1) {
        if(
          res.data.id_proof_front != '' ||
          res.data.id_proof_back != '' ||
          res.data.bank_ac_front != '' ||
          res.data.residence_proof_front != ''
        ) {
          this.uploadocs = true;
        }
        this.successMsg = res.message;
        this.success = false;
        this.profiledata.newPass = '';
        this.profiledata.confNewPass = '';
        setTimeout(() => {
          this.successMsg = '';
          this.success = true;
        }, 3000);
        const user2 = localStorage.getItem('uid');
        const accessToken = localStorage.getItem('access_token');
        const deviceId = localStorage.getItem('device_id');
        const deviceType = localStorage.getItem('device_type');
        const accessI = localStorage.getItem('access');
        const data2 = {
          base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
          uid: user2,
          device_id: deviceId,
          device_type: deviceType,
          api_key: 'cleaner@user#2',
          access: accessI,
          access_token: accessToken
        };
        this.auth.getWorkingHoursSrvs(data2).subscribe((res2: tokendata) => {
          if (res.status == '2') {
            this.errMsg = 'Session timeout logging out.';
            localStorage.clear();
            window.location.href = '/login';
          }
          if (res2.data.length === 0) {
            this.workingUpdate = false;
          }
        });
      } else {
        this.errMsg = res.message;
        this.error = false;
        setTimeout(() => {
          this.errMsg = '';
          this.error = true;
        }, 3000);
      }
      window.scrollTo(0, 0);
    });
  }
  additionalDetails(access) {

    if(!access){
      this.AdminApprovalErr1 = 'administratörsgodkännande väntar.';
          setTimeout(()=>{
            this.AdminApprovalErr1 = '';
      }, 3000);
      return false;
  }

    let check1 = 0;
    let check2 = 0;
    let check3 = 0;
    let check4 = 0;
    if (this.theCheckbox1 === true) {
      check1 = 1;
    }
    if (this.theCheckbox2 === true) {
      check2 = 1;
    }
    if (this.theCheckbox3 === true) {
      check3 = 1;
    }
    if (this.theCheckbox4 === true) {
      check4 = 1;
    }
    const user = localStorage.getItem('uid');
    const deviceid = localStorage.getItem('device_id');
    const devicetype = localStorage.getItem('device_type');
    const apikey = 'cleaner@user#2';
    const accesstoken = localStorage.getItem('access_token');
    const accessk = localStorage.getItem('access');
    const data = {
      base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
      uid: user,
      device_id: deviceid,
      device_type: devicetype,
      api_key: apikey,
      access: accessk,
      access_token: accesstoken,
      pets: check1,
      ironing: check2,
      available_on_another: check3,
      windows: check4
    };
    this.auth.cleanerAdditionalSrvs(data).subscribe((res: tokendata) => {
      if (res.status == '2') {
        this.errMsg = 'Session timeout logging out.';
        localStorage.clear();
        window.location.href = '/login';
      }
      if (res.status === 1) {
        this.successMsg = res.message;
        this.success = false;
        setTimeout(() => {
          this.successMsg = '';
          this.success = true;
        }, 3000);
      } else {
        this.errMsg = res.message;
        this.error = false;
        setTimeout(() => {
          this.errMsg = '';
          this.error = true;
        }, 3000);
      }
      const user2 = localStorage.getItem('uid');
      const accessToken = localStorage.getItem('access_token');
      const deviceId = localStorage.getItem('device_id');
      const deviceType = localStorage.getItem('device_type');
      const accessI = localStorage.getItem('access');
      const data2 = {
        base_url_server: this.baseUrl.baseAppUrl,
                    base_url_client: this.baseUrl.baseAppUrlC,
        uid: user2,
        device_id: deviceId,
        device_type: deviceType,
        api_key: 'cleaner@user#2',
        access: accessI,
        access_token: accessToken
      };
      this.auth.getWorkingHoursSrvs(data2).subscribe((res2: tokendata) => {
        if (res.status == '2') {
          this.errMsg = 'Session timeout logging out.';
          localStorage.clear();
          window.location.href = '/login';
        }
        if (res2.data.length === 0) {
          this.workingUpdate = false;
        }
      });
      window.scrollTo(0, 0);
    });
  }
  working(access) {
    this.router.navigate(['/working-hourse']);
  }

  updateDetailsCleaner(access) {
    //routerLink="/update-detail-cleaner"
    this.router.navigate(['/update-detail-cleaner']);
  //   if(access)
  //   else{
  //     this.AdminApprovalErr2 = 'administratörsgodkännande väntar.';
  //     setTimeout(()=>{
  //       this.AdminApprovalErr2 = '';
  //  }, 3000);
  //     return false;}
  }

}
