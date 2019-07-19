import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { Modalable } from '../modal/modalable';

import * as $ from 'jquery';

@Component({
  selector: 'employee-delete-modal',
  templateUrl: './employee-delete-modal.component.html',
  styleUrls: ['./employee-delete-modal.component.css']
})
export class EmployeeDeleteModalComponent extends Modalable implements OnInit {

  @Input()
  employee: Employee;

  @Output()
  onDestroy: EventEmitter<Employee> = new EventEmitter<Employee>()

  constructor(private element: ElementRef, private employeeService: EmployeeService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  destroy() {
    const copy = Object.assign({}, this.employee);
    this.employeeService.destroyEmployee(this.employee);
    this.onDestroy.emit(copy);
    this.hide();
  }
}
