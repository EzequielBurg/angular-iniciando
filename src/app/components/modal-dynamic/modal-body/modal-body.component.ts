import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'modal-body',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class ModalBodyComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit() {
    const nativeElement: HTMLElement = this.element.nativeElement;
    const firstChild = nativeElement.firstChild;
    (firstChild as any).classList.add('modal-body');
  }

}
