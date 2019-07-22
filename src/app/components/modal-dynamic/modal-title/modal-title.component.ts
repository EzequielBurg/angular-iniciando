import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'modal-title',
  template: `
  <div class="modal-header">
    <ng-content></ng-content>
    <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  `,
  styles: []
})
export class ModalTitleComponent implements OnInit {

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const nativeElement: HTMLElement = this.element.nativeElement;
    const firstChild = nativeElement.firstChild.firstChild;
    (firstChild as any).classList.add('modal-title');
  }

}
