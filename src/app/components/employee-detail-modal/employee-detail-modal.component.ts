import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { ModalRefService } from '../modal-dynamic/modal-ref.service';

@Component({
  selector: 'employee-detail-modal',
  templateUrl: './employee-detail-modal.component.html',
  styleUrls: ['./employee-detail-modal.component.css']
})
export class EmployeeDetailModalComponent implements OnInit {

  employee: Employee;

  constructor(private modalRef: ModalRefService) {
    // tslint:disable-next-line: no-string-literal
    this.employee = this.modalRef.context['employee'];
  }

  ngOnInit() {}
}
