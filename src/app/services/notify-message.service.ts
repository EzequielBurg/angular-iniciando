import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyButtons';

enum Types {
  success = 'success',
  error   = 'error'
}

@Injectable({
  providedIn: 'root'
})

export class NotifyMessageService {

  constructor() { }

  success(title, text) {
    this.alert({title, text, type: Types.success});
  }

  error(title, text) {
    this.alert({title, text, type: Types.error});
  }

  private alert({title, text, type}: {title, text, type: Types}) {
    this.pnotify.alert({
      title,
      titleTrusted: true,   // resolve o problema de nao renderizar html na mensagem
      text,
      textTrusted: true,
      type
    });
  }

  private get pnotify() {
    return PNotify;
  }
}
