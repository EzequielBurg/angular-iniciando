import { Component, OnInit, ViewChild, ComponentFactoryResolver, ElementRef, Injector, ViewContainerRef } from '@angular/core';
import { ModalContentDirective } from '../modal-content.directive';
import { ModalRefService } from '../modal-ref.service';
declare const $;

@Component({
  selector: 'modal-dynamic',
  template: `
  <div class="modal" tabindex="-1" role="dialog">
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

  @ViewChild(ModalContentDirective, {read: ViewContainerRef, static: true}) modalContent: ModalContentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private element: ElementRef, private injector: Injector) { }

  ngOnInit() {
  }

  mount(modalImplementedComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalImplementedComponent);
    const viewContainerRef = this.modalContent.viewContainerRef;
    viewContainerRef.createComponent(componentFactory, null, this.makeLocalInjector());
  }

  private makeLocalInjector() {
    return Injector.create({
      providers: [
        {provide: ModalRefService, useValue: this.makeModalRef()}
      ],
      parent: this.injector
    });
  }

  private makeModalRef() {
    const modalRef = new ModalRefService();
    modalRef.instance = this;
    return modalRef;
  }

  hide() {
    $(this.divModal).modal('hide');
  }

  showModal() {
    $(this.divModal).modal('show');
  }

  private get divModal(): HTMLElement {
    const nativeElement: HTMLElement = this.element.nativeElement;
    return nativeElement.firstChild as HTMLElement;
  }


  /*
  hide() {
    $(this.divModal).hide();
  }

  showModal() {
    $(this.divModal).show();
  }
  */
}
