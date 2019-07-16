import { ViewChild } from '@angular/core';
import { ModalComponent } from './modal.component';

export class Modalable {
  @ViewChild(ModalComponent, { static: true })
  modalComponent: ModalComponent;


  hide() {
    this.modalComponent.hide();
  }

  showModal() {
    this.modalComponent.showModal();
  }
}
