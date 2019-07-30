import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDeleteModalComponent } from '../employee-delete-modal/employee-delete-modal.component';
import { EmployeeDetailModalComponent } from '../employee-detail-modal/employee-detail-modal.component';
import { ModalServiceService } from '../modal-dynamic/modal-service.service';
import { EmployeeHttpService } from 'src/app/services/employee-http.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];    // feito para usar com a API

  search = '';

  sortColumn = {column: 'name', sort: 'asc'};

  pagination = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 7
  };

  columns = [
    {name: 'name', label: 'Nome', order: true},
    {name: 'salary', label: 'Salário', order: true},
    {label: 'Bônus'},
    {label: 'Ações'},
  ];

  constructor(private modalService: ModalServiceService, private employeeHttp: EmployeeHttpService) {}

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

  handleSearch(search) {    // método para lidar com as buscas
    this.search = search;
    this.pagination.currentPage = 1;
    this.getEmployees();
   }

   handleSort() {
     this.getEmployees();
   }

  handlePagination(page) {
    this.pagination.currentPage = page;
    this.getEmployees();
  }

  getEmployees() {    // feito para usar com a API
    this.employeeHttp.list({
      search: this.search,
      sort: this.sortColumn,
      pagination: {
        page: this.pagination.currentPage,
        perPage: this.pagination.itemsPerPage
      }
    })  // data corresponde ao body da resposta http, o corpo do resultado em JSON. Response corresponde À requisição inteira
    .subscribe(response => {
      this.pagination.totalItems = +response.headers.get('X-Total-Count');  // '+' serve para transformar um tipo qualquer em number
      this.employees = response.body;
    });
  }
}
