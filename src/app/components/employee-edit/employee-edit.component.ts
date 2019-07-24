import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { ModalRefService } from '../modal-dynamic/modal-ref.service';

declare const $;

@Component({
  selector: 'employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit, OnChanges {

  employee: Employee;

  @Input('ngModel')
  model: Employee

  constructor(private modalRef: ModalRefService) {
    // tslint:disable-next-line: no-string-literal
    this.employee = this.modalRef.context['employee'];
  }

  ngOnInit() {}

  ngOnChanges(event) {
    if (this.model !== event) {
      this.model.name = event(this.employee.name);
      this.model.salary = event(this.employee.salary);
      this.model.name = event(this.employee.bonus);
    }
  }

  editEmployee(event) {
    const copy = Object.assign({}, this.employee);
    this.modalRef.hide({employee: copy, submitted: true});
  }
}
