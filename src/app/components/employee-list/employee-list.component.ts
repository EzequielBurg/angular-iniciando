import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDeleteModalComponent } from '../employee-delete-modal/employee-delete-modal.component';
import { EmployeeDetailModalComponent } from '../employee-detail-modal/employee-detail-modal.component';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employee: Employee;
  showMessageSuccess = false;
  showMessageEdit    = false;
  showMessageDelete  = false;
  employeeToEdit: Employee;
  employeeToDelete: Employee;
  employeeToDetail: Employee;
  data = new Date();

  @ViewChild('employeeNewModal', { static: true })
  employeeNewModal: EmployeeNewModalComponent;

  @ViewChild(EmployeeEditComponent, { static: true }) //pegar uma referencia de algum componente (no caso a primeira div)
  employeeEdit: EmployeeEditComponent;

  @ViewChild(EmployeeDeleteModalComponent, { static: true })
  employeeDeleteModal: EmployeeDeleteModalComponent;

  @ViewChild(EmployeeDetailModalComponent, { static: true })
  employeeDetailModal: EmployeeDetailModalComponent;

  constructor(public employeeService: EmployeeService) {
  }

  ngOnInit() {
  }

  openNewModal() {
    this.employeeNewModal.showModal();
  }

  openEdit(employee: Employee) {
    this.employeeToEdit = employee;
    this.employeeEdit.showModal();
  }

  openDetailModal(employee: Employee) {
    this.employeeToDetail = employee;
    this.employeeDetailModal.showModal();
    console.log(employee);
  }

  onDetailEmployee(employee: Employee) {
    console.log(employee);
  }

  openDestroyModal(employee: Employee) {
    this.employeeToDelete = employee;
    this.employeeDeleteModal.showModal();
  }

  onNewEmployee(employee: Employee) {
    this.employee = employee;
    this.showMessageSuccess = true;
  }

  onEditEmployee(employee: Employee) {
    console.log(employee);
    this.showMessageEdit = true;
  }

  onDestroyEmployee(employee: Employee) {
    console.log(employee);
    this.showMessageDelete = true;
  }

  fechou(event) {
    console.log(event);
  }

}
