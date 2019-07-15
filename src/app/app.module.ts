import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component'
import { FormsModule } from '@angular/forms';
import { SalaryColorDirective } from './salary-color.directive';
import { EmployeeNewModalComponent } from './employee-new-modal/employee-new-modal.component';
import { AlertSuccessComponent } from './alert-success/alert-success.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDeleteModalComponent } from './employee-delete-modal/employee-delete-modal.component';
import { MyCurrencyPipe } from './my-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    SalaryColorDirective,
    EmployeeNewModalComponent,
    AlertSuccessComponent,
    EmployeeEditComponent,
    EmployeeDeleteModalComponent,
    MyCurrencyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
