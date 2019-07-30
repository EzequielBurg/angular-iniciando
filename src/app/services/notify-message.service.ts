import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyButtons';
declare const $;

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
      type,
      stack: {"dir1": "down", "dir2": "right", "firstpos1": ($(window).height() / 1.2), "firstpos2": ($(window).width() / 1.31 - 50)}
    });
  }

  private get pnotify() {
    return PNotify;
  }
}
