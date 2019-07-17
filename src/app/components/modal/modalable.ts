import { ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from './modal.component';

export class Modalable {
  @ViewChild(ModalComponent, { static: true })
  modalComponent: ModalComponent;

  @Output()
  onHide: EventEmitter<any> = new EventEmitter()

  @Output()
  onShow: EventEmitter<any> = new EventEmitter()


  ngOnInit() {
    this.modalComponent.onHide.subscribe(event => {
      console.log(event);
      this.onHide.emit(event);
    });

    this.modalComponent.onShow.subscribe(event => {
      console.log(event);
      this.onShow.emit(event);
    });
  }

  hide() {
    this.modalComponent.hide();
  }

  showModal() {
    this.modalComponent.showModal();
  }
}
