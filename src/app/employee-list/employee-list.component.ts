import { Component, OnInit, ViewChild } from '@angular/core';
import employees from '../employees'
import { EmployeeService, Employee } from '../employee.service'
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDeleteModalComponent } from '../employee-delete-modal/employee-delete-modal.component';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employee: Employee
  showMessageSuccess = false
  employeeToEdit: Employee
  employeeToDelete: Employee

  @ViewChild(EmployeeNewModalComponent, { static: true }) //pegar uma referencia de algum componente (no caso a primeira div)
  employeeNewModal: EmployeeNewModalComponent

  @ViewChild(EmployeeEditComponent, { static: true }) //pegar uma referencia de algum componente (no caso a primeira div)
  employeeEdit: EmployeeEditComponent

  @ViewChild(EmployeeDeleteModalComponent, { static: true }) //pegar uma referencia de algum componente (no caso a primeira div)
  employeeDeleteModal: EmployeeDeleteModalComponent

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  openNewModal() {
    this.employeeNewModal.showModal()
  }

  openEdit(employee: Employee) {
    this.employeeToEdit = employee
    this.employeeEdit.showModal()
  }

  openDestroyModal(employee: Employee){
    this.employeeToDelete = employee
    this.employeeDeleteModal.showModal()
  }

  onNewEmployee(employee: Employee) {
    this.employee = employee
    this.showMessageSuccess = true
  }

  onEditEmployee(employee: Employee) {
    console.log(employee);
  }

  onDestroyEmployee(employee: Employee) {
    console.log(employee);
  }
}
