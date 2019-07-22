import { Component, OnInit, ViewChild, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { ModalContentDirective } from '../modal-content.directive';
declare const $;

@Component({
  selector: 'modal-dynamic',
  template: `
  <div class="modal" tabindex="-1" role="dialog" aria-hidden="true" id="#novoEmpregado">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <ng-content modalContent></ng-content>
      </div> --->
    </div>
  </div>
  `,
  styles: []
})

export class ModalDynamicComponent implements OnInit {

  @ViewChild(ModalContentDirective, {static: true}) modalContent: ModalContentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private element: ElementRef) { }

  ngOnInit() {
  }

  mount(modalImplementedComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalImplementedComponent);
    const viewContainerRef = this.modalContent.viewContainerRef;
    viewContainerRef.createComponent(componentFactory);
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