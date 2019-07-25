import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {Employee, EmployeeService} from '../../services/employee.service';
import { InputDirective } from 'src/app/directives/input.directive';
import { ModalRefService } from '../modal-dynamic/modal-ref.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private employeeService: EmployeeService, private modalRef: ModalRefService, private http: HttpClient) {}

  ngOnInit() {
    this.modalRef.onShow.subscribe(() => {
      // console.log(this.inputName);
      // this.inputName.focus();
    });
  }

  addEmployee(event) {    // mudanças para adicionar e mandar pra API. Também com fechamento automático da modal
    this.http.post('http://localhost:3000/employees', this.employee)
    .subscribe(data => this.modalRef.hide({employee: data, submitted: true}));
  }

  /*fechou(event) {
    console.log(event);
  }

  mostrou(event) {
    console.log(event);
  }*/
}
