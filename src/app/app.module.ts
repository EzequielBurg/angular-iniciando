import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FormsModule } from '@angular/forms';
import { SalaryColorDirective } from './directives/salary-color.directive';
import { EmployeeNewModalComponent } from './components/employee-new-modal/employee-new-modal.component';
import { AlertSuccessComponent } from './components/alert-success/alert-success.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeDeleteModalComponent } from './components/employee-delete-modal/employee-delete-modal.component';
import { MyCurrencyPipe } from './pipes/my-currency.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { TestComponent } from './components/test/test.component';
import { EmployeeDetailModalComponent } from './components/employee-detail-modal/employee-detail-modal.component';
import { InputDirective } from './directives/input.directive';
import { GetViewContainerDirective } from './directives/get-view-container.directive';
import { TestDynamicComponentComponent } from './components/test-dynamic-component/test-dynamic-component.component';
import { ModalDynamicComponent } from './components/modal-dynamic/modal-dynamic/modal-dynamic.component';
import { ModalContentDirective } from './components/modal-dynamic/modal-content.directive';
import { ModalTitleComponent } from './components/modal-dynamic/modal-title/modal-title.component';
import { ModalBodyComponent } from './components/modal-dynamic/modal-body/modal-body.component';
import { ModalFooterComponent } from './components/modal-dynamic/modal-footer/modal-footer.component';
import { TestModalDynamicComponent } from './components/test-modal-dynamic/test-modal-dynamic.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    SalaryColorDirective,
    EmployeeNewModalComponent,
    AlertSuccessComponent,
    EmployeeEditComponent,
    EmployeeDeleteModalComponent,
    MyCurrencyPipe,
    ModalComponent,
    TestComponent,
    EmployeeDetailModalComponent,
    InputDirective,
    GetViewContainerDirective,
    TestDynamicComponentComponent,
    ModalDynamicComponent,
    ModalContentDirective,
    ModalTitleComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    TestModalDynamicComponent
  ],

  entryComponents: [
    EmployeeListComponent,
    TestDynamicComponentComponent,
    ModalDynamicComponent,
    TestModalDynamicComponent,
    EmployeeNewModalComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
