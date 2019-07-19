import { Component, OnInit, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { Modalable } from '../modal/modalable';

declare const $;

@Component({
  selector: 'employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent extends Modalable implements OnInit {

  @Input()
  employee: Employee;

	@Output()
  onSubmit: EventEmitter<Employee> = new EventEmitter<Employee>()

  constructor(private element: ElementRef) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  addEmployee(event) {
    const copy = Object.assign({}, this.employee);
    this.onSubmit.emit(copy);
    this.hide();
  }
}
