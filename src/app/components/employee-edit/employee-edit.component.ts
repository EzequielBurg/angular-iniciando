import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { ModalRefService } from '../modal-dynamic/modal-ref.service';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { EmployeeHttpService } from 'src/app/services/employee-http.service';

declare const $;

@Component({
  selector: 'employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employee: Employee = {
    name: '',
    salary: 0,
    bonus: 0
  };
  employeeId: number;

  constructor(private notifyMessage: NotifyMessageService, private modalRef: ModalRefService, private employeeHttp: EmployeeHttpService) {
    // tslint:disable-next-line: no-string-literal
    this.employeeId = this.modalRef.context['employeeId'];
  }

  ngOnInit() {
    this.employeeHttp.get(this.employeeId).subscribe(data => this.employee = data);  // data possui {name, salary, bonus}
  }

  editEmployee() {
    this.employeeHttp.update(this.employee).subscribe(data => this.modalRef.hide({employee: data, submitted: true}));
    this.notifyMessage.success('Parabéns!', `O empregado <strong>${this.employee.name}</strong> foi editado com sucesso!`);
  }
}
