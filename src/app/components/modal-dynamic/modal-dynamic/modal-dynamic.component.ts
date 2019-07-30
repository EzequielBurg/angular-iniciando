import { Component, OnInit, ViewChild, ComponentFactoryResolver, ElementRef, Injector, OnDestroy } from '@angular/core';
import { ModalContentDirective } from '../modal-content.directive';
import { ModalRefService } from '../modal-ref.service';
import { ReplaySubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
declare const $;

@Component({
  selector: 'modal-dynamic',
  template: `
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <ng-template modalContent></ng-template>
      </div>
    </div>
  </div>
  `,
  styles: []
})

export class ModalDynamicComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name
  private _onHide: ReplaySubject<any> = new ReplaySubject(1);

  // tslint:disable-next-line: variable-name
  private _onShow: ReplaySubject<any> = new ReplaySubject(1);

  @ViewChild(ModalContentDirective, { static: true }) modalContent: ModalContentDirective;
  modalRef: ModalRefService;

  hideEventData = null;
  showEventData = null;
  contextModal;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private element: ElementRef, private injector: Injector) { }

  ngOnInit() {}

  get onHide(): Observable<any> {
    return this._onHide.pipe(first());
  }

  get onShow(): Observable<any> {
    return this._onShow.pipe(first());
  }

  ngOnDestroy() {
    // console.log('modal dynamic component destruído');
  }

  mount(modalImplementedComponent, context = {}): ModalRefService {
    this.contextModal = context;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalImplementedComponent);
    const viewContainerRef = this.modalContent.viewContainerRef;
    viewContainerRef.createComponent(componentFactory, null, this.makeLocalInjector());
    return this.modalRef;
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
    this.modalRef = new ModalRefService();
    this.modalRef.instance = this;
    this.modalRef.context = this.contextModal;
    return this.modalRef;
  }

  hide(eventData = null) {
    this.hideEventData = eventData;
    $(this.divModal).modal('hide');
  }

  showModal(eventData = null) {
    this.registerEvents();
    this.showEventData = eventData;
    $(this.divModal).modal('show');
  }

  dispose() {   // metodo do bootstrap
    $(this.divModal).modal('dispose');
  }

  private registerEvents() {
    $(this.divModal).on('hidden.bs.modal', (e) => {   // hidden.bs.modal é um evento do bootstrap
      this._onHide.next({
        event: e,
        data: this.hideEventData
      });
    });

    $(this.divModal).on('shown.bs.modal', (e) => {
      this._onShow.next({
        event: e,
        data: this.showEventData
      });
    });
  }

  private get divModal(): HTMLElement {
    const nativeElement: HTMLElement = this.element.nativeElement;
    return nativeElement.firstChild as HTMLElement;
  }
}
