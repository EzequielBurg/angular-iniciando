import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { EmployeeDeleteModalComponent } from '../employee-delete-modal/employee-delete-modal.component';
import { EmployeeDetailModalComponent } from '../employee-detail-modal/employee-detail-modal.component';
import { ModalServiceService } from '../modal-dynamic/modal-service.service';

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
  // employeeToDelete: Employee;
  employeeToDetail: Employee;
  data = new Date();
  isLoading = true;

  // @ViewChild(EmployeeDeleteModalComponent, { static: true }) // pegar uma referencia de algum componente (no caso a primeira div)
  // employeeDeleteModal: EmployeeDeleteModalComponent;

  @ViewChild(EmployeeDetailModalComponent, { static: true })
  employeeDetailModal: EmployeeDetailModalComponent;

  constructor(public employeeService: EmployeeService, private modalService: ModalServiceService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

  openNewModal() {
    const modalRef = this.modalService.create(EmployeeNewModalComponent);
    // modalRef.instance.onHide.subscribe((data));
    modalRef.onHide.subscribe((event) => {
      console.log(event);
    });
    modalRef.show();
  }

  openEdit(employee: Employee) {
    const modalRef = this.modalService.create(EmployeeEditComponent, {employee});
    // modalRef.instance.onHide.subscribe((data));
    modalRef.onHide.subscribe((event) => {
      console.log(event);
    });
    modalRef.show();
}

  openDetailModal(employee: Employee) {
    this.employeeToDetail = employee;
    this.employeeDetailModal.showModal();
  }

  onDetailEmployee(employee: Employee) {
    console.log(employee);
  }

  openDestroyModal(employee: Employee) {
    const modalRef = this.modalService.create(EmployeeDeleteModalComponent, {employee});
    modalRef.onHide.subscribe((event) => {
      console.log(event);
    });
    modalRef.show();

    // this.employeeToDelete = employee;
    // this.employeeDeleteModal.showModal();
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
