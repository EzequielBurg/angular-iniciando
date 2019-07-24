import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'modal-footer',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class ModalFooterComponent {}
