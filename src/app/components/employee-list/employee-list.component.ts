import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDeleteModalComponent } from '../employee-delete-modal/employee-delete-modal.component';
import { EmployeeDetailModalComponent } from '../employee-detail-modal/employee-detail-modal.component';
import { ModalServiceService } from '../modal-dynamic/modal-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  successMessage = {
    message: '',
    show: false
  };

  employees: any = [];    // feito para usar com a API

  constructor(public employeeService: EmployeeService, private modalService: ModalServiceService, private http: HttpClient) {}

  ngOnInit() {
    this.getEmployees();    // chamando listagem pela API
  }

  openNewModal() {
    const modalRef = this.modalService.create(EmployeeNewModalComponent);
    modalRef.onHide.subscribe((event) => {
      const eventData = event.data;
      if (eventData && eventData.hasOwnProperty('employee')) {
        const employee = eventData.employee;
        const message = `O empregado <strong>${employee.name}</strong> foi criado com sucesso`;
        this.showSuccessMessage(message);
      }
    });
    modalRef.show();
  }

  openEdit(employee: Employee) {
    const modalRef = this.modalService.create(EmployeeEditComponent, {employeeId: employee.id});
    modalRef.onHide.subscribe((event) => {
      const eventData = event.data;
      if (eventData && eventData.hasOwnProperty('employee')) {
        const message = `O empregado <strong>${employee.name}</strong> foi alterado com sucesso`;
        this.showSuccessMessage(message);
      }
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
      const eventData = event.data;
      if (eventData && eventData.hasOwnProperty('employee')) {
        const message = `O empregado <strong>${employee.name}</strong> foi excluído com sucesso`;
        this.showSuccessMessage(message);
      }
    });
    modalRef.show();
  }

  showSuccessMessage(message) {
    this.getEmployees();    // chamando novamente a API para atualizar a listagem após a ação
    this.successMessage.message = message;
    this.successMessage.show = true;
    setTimeout(() => {
      this.successMessage.show = false;
    }, 3000);
  }

  getEmployees() {
    this.http.get<Employee[]>('http://localhost:3000/employees')
    .subscribe(data => this.employees = data);   // feito para usar com a API
  }
}
