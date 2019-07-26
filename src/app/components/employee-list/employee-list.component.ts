import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDeleteModalComponent } from '../employee-delete-modal/employee-delete-modal.component';
import { EmployeeDetailModalComponent } from '../employee-detail-modal/employee-detail-modal.component';
import { ModalServiceService } from '../modal-dynamic/modal-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];    // feito para usar com a API

  constructor(private modalService: ModalServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.getEmployees();    // chamando listagem pela API
  }

  openNewModal() {
    const modalRef = this.modalService.create(EmployeeNewModalComponent);
    modalRef.onHide.subscribe((event) => {
      this.getEmployeesAfterSuccess(event);
    });
    modalRef.show();
  }

  openEdit(employee: Employee) {
    const modalRef = this.modalService.create(EmployeeEditComponent, {employeeId: employee.id});
    modalRef.onHide.subscribe((event) => {
      this.getEmployeesAfterSuccess(event);
    });
    modalRef.show();
}

  openDetailModal(employee: Employee) {
    const modalRef = this.modalService.create(EmployeeDetailModalComponent, {employee});
    modalRef.show();
  }

  openDestroyModal(employee: Employee) {
    const modalRef = this.modalService.create(EmployeeDeleteModalComponent, {employeeId: employee.id});
    modalRef.onHide.subscribe((event) => {
      this.getEmployeesAfterSuccess(event);
    });
    modalRef.show();
  }

  getEmployeesAfterSuccess(event) {
    const eventData = event.data;
    if (eventData && eventData.hasOwnProperty('submitted')) {
      this.getEmployees();
    }
  }

  getEmployees() {
    this.http.get<Employee[]>('http://localhost:3000/employees')
    .subscribe(data => this.employees = data);   // feito para usar com a API
  }
}
