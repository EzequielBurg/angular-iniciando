import { Component, OnInit } from '@angular/core';
import employees from '../employees'
import {EmployeeService, Employee} from '../employee.service'

//data binding
@Component({
  selector: 'employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.css']
})
export class EmployeeNewComponent implements OnInit {

  employee: Employee = {
    name : '',
    salary : 0,
    bonus : 0  
  }
  
  constructor(private employeeService: EmployeeService) { 
    /*setTimeout(()=>{
      this.name = 'Joao Pereira'
    }, 3000)*/  
  }

  ngOnInit() {
  }


  addEmployees(){
    const copy = Object.assign({}, this.employee)
    this.employeeService.addEmployee(copy)
  }

}
