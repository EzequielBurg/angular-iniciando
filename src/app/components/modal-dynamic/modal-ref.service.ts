import { Injectable, ApplicationRef, ComponentRef } from '@angular/core';
import { ModalDynamicComponent } from './modal-dynamic/modal-dynamic.component';

@Injectable()

export class ModalRefService {

  instance: ModalDynamicComponent;
  context: any;
  appRef: ApplicationRef;

  constructor() { }

  show(eventData = null) {
    this.instance.showModal(eventData);
  }

  hide(eventData = null) {
    this.instance.hide(eventData);
  }

  set componentRef(compRef: ComponentRef<ModalDynamicComponent>) {
    const instance = compRef.instance;
    instance.onHide.subscribe(() => {
      // instance.dispose();
      this.appRef.detachView(compRef.hostView);
      compRef.destroy();
    });
  }

  get onShow() {
    return this.instance.onShow;
  }

  get onHide() {
    return this.instance.onHide;
  }
}
