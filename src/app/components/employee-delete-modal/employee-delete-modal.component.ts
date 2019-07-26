import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { ModalRefService } from '../modal-dynamic/modal-ref.service';
import { HttpClient } from '@angular/common/http';
import { NotifyMessageService } from 'src/app/services/notify-message.service';

@Component({
  selector: 'employee-delete-modal',
  templateUrl: './employee-delete-modal.component.html',
  styleUrls: ['./employee-delete-modal.component.scss']
})
export class EmployeeDeleteModalComponent implements OnInit {

  employee: Employee = {
    name: '',
    salary: 0,
    bonus: 0
  };
  employeeId: number;

  constructor(private notifyMessage: NotifyMessageService, private modalRef: ModalRefService, private http: HttpClient) {
    // tslint:disable-next-line: no-string-literal
    this.employeeId = this.modalRef.context['employeeId'];
  }

  ngOnInit() {
    this.http.get<Employee>(`http://localhost:3000/employees/${this.employeeId}`)
    .subscribe(data => this.employee = data);  // data possui {name, salary, bonus}
  }

  destroy() {
    this.http.delete(`http://localhost:3000/employees/${this.employee.id}`)
    .subscribe(data => this.modalRef.hide({employee: this.employee, submitted: true}));
    this.notifyMessage.success('Parabéns!', `O empregado <strong>${this.employee.name}</strong> foi excluído com sucesso!`);

  }
}
