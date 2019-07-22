import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ModalContent]'
})
export class ModalContentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
