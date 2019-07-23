import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
/*import * as $ from 'jquery';*/
declare const $;

@Component({
selector: 'modal',
template: `
<div class="modal" tabindex="-1" role="dialog" aria-hidden="true" id="#novoEmpregado">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <ng-content select="[modal-title]"></ng-content>
        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
    	    <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <ng-content select="[modal-body]"></ng-content>
      <ng-content select="[modal-footer]"></ng-content>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class ModalComponent implements OnInit {

  @Output()
  onHide: EventEmitter<any> = new EventEmitter();


  @Output()
  onShow: EventEmitter<any> = new EventEmitter();


  constructor(private element: ElementRef) {}

  ngOnInit() {
    const nativeElement: HTMLElement = this.element.nativeElement;
    nativeElement.querySelector('[modal-title]');
    nativeElement.querySelector('[modal-body]');
    nativeElement.querySelector('[modal-footer]');

    $(this.divModal).on('hidden.bs.modal', (e) => {
      // console.log('escondido', e);
      this.onHide.emit(e);
    });

    $(this.divModal).on('shown.bs.modal', (e) => {
      // console.log('mostrado', e);
      this.onShow.emit(e);
    });
  }

  hide() {
    $(this.divModal).modal('hide');
  }

  showModal() {
    $(this.divModal).modal('show');
  }

  /*
  hide() {
    $(this.divModal).hide();
  }

  showModal() {
    $(this.divModal).show();
  }
  */

  private get divModal(): HTMLElement {
    const nativeElement: HTMLElement = this.element.nativeElement;
    return nativeElement.firstChild as HTMLElement;
  }

}
