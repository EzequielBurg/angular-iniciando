import { Component, ViewChild, TemplateRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';
import { GetViewContainerDirective } from './directives/get-view-container.directive';
import { TestDynamicComponentComponent } from './components/test-dynamic-component/test-dynamic-component.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ModalServiceService } from './components/modal-dynamic/modal-service.service';
import { TestModalDynamicComponent } from './components/test-modal-dynamic/test-modal-dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular';
  flagLogo = true;
  role = 'admin';
  objContext = {
    name: 'Joao Bolao',
  };

  @ViewChild('template', {static: true})
  template: TemplateRef<any>;

  @ViewChild(GetViewContainerDirective, {static: true})
  getViewContainer: GetViewContainerDirective;

  components = [TestDynamicComponentComponent, EmployeeListComponent];
  indexComponents = -1;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private modalService: ModalServiceService) {}

  ngOnInit() {

    setInterval(() => {
      this.getViewContainer.viewContainerRef.clear();
      this.indexComponents++;
      if (this.indexComponents === this.components.length) {
        this.indexComponents = 0;
      }
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components[this.indexComponents]);
      this.getViewContainer.viewContainerRef.createComponent(componentFactory);
    }, 1000000);

    const modalRef = this.modalService.create(TestModalDynamicComponent);
    modalRef.show();

    // setTimeout(() => {
    //   this.flagLogo = false;
    // }, 5000);

    // setTimeout(() => {
    //   this.role = 'manager';
    // }, 5000);
  }

  ngAfterViewInit() {
    // setInterval(() => {
    //   this.getViewContainer.viewContainerRef.clear();
    //   this.indexComponents++;
    //   if (this.indexComponents === this.components.length) {
    //     this.indexComponents = 0;
    //   }
    //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components[this.indexComponents]);
    //   this.getViewContainer.viewContainerRef.createComponent(componentFactory);
    // }, 4000);
  }
}
