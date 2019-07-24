import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {Employee, EmployeeService} from '../../services/employee.service';
import { InputDirective } from 'src/app/directives/input.directive';
import { ModalRefService } from '../modal-dynamic/modal-ref.service';

@Component({
selector: 'employee-new-modal',
templateUrl: './employee-new-modal.component.html',
styleUrls: ['./employee-new-modal.component.css']
})
export class EmployeeNewModalComponent implements OnInit {

  employee: Employee = {
    name : '',
    salary : 0,
    bonus : 0
  };

  @ViewChild(InputDirective, { static: true })
  inputName: InputDirective;


  // @ViewChild('inputSalary', { static: true })
  // inputSalary: InputDirective;

  @ViewChildren(InputDirective)
  inputs;

  constructor(private employeeService: EmployeeService, private modalRef: ModalRefService) {}

  ngAfterViewInit() {
    console.log(this.inputs);
  }

  ngOnInit() {
    this.modalRef.onShow.subscribe(() => {
      console.log(this.inputName);
      // this.inputName.focus();
    });
  }

  addEmployee(event) {
    const copy = Object.assign({}, this.employee);
    this.employeeService.addEmployee (copy);
    this.modalRef.hide({employee: copy, submitted: true});
  }

  /*fechou(event) {
    console.log(event);
  }

  mostrou(event) {
    console.log(event);
  }*/
}
