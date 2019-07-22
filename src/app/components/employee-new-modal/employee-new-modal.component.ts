import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import {Employee, EmployeeService} from '../../services/employee.service';
import { Modalable } from '../modal/modalable';
import { InputDirective } from 'src/app/directives/input.directive';

@Component({
selector: 'employee-new-modal',
templateUrl: './employee-new-modal.component.html',
styleUrls: ['./employee-new-modal.component.css']
})
export class EmployeeNewModalComponent extends Modalable implements OnInit {

  employee: Employee = {
    name : '',
    salary : 0,
    bonus : 0
  };

  @ViewChild(InputDirective, { static: true })
  inputName: InputDirective;


  // @ViewChild('inputSalary', { static: true })
  // inputSalary: InputDirective;

  @Output()
  onSubmit: EventEmitter<Employee> = new EventEmitter<Employee>()

  @ViewChildren(InputDirective)
  inputs;

  constructor(private employeeService: EmployeeService) {
    super();
  }

  ngAfterViewInit() {
    console.log(this.inputs);
  }

  ngOnInit() {
    super.ngOnInit();
    this.onShow.subscribe(() => {
      console.log(this.inputName);
      this.inputName.focus();
    });
  }

  addEmployee(event) {
    const copy = Object.assign({}, this.employee);
    this.employeeService.addEmployee (copy);
    this.onSubmit.emit(copy);
    this.hide();
  }

  /*fechou(event) {
    console.log(event);
  }

  mostrou(event) {
    console.log(event);
  }*/
}
