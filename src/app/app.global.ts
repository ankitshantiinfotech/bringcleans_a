import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
  // local
  // readonly baseAppUrl: string = 'http://localhost:4007/';
  // readonly baseAppUrlC: string = 'http://localhost:4003/';
  // development
  // readonly baseAppUrl: string = 'http://78.46.210.25:4009/';
  // readonly baseAppUrlC: string = 'http://78.46.210.25:4005/';
  // staging
  readonly baseAppUrl: string = 'http://78.46.210.25:4007/';
  readonly baseAppUrlC: string = 'http://78.46.210.25:4003/';
}
