import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { ModalRefService } from '../modal-dynamic/modal-ref.service';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { EmployeeHttpService } from 'src/app/services/employee-http.service';

@Component({
selector: 'employee-new-modal',
templateUrl: './employee-new-modal.component.html',
styleUrls: ['./employee-new-modal.component.scss']
})

export class EmployeeNewModalComponent implements OnInit {

  employee: Employee = {
    name : '',
    salary : 0,
    bonus : 0
  };

  constructor(private notifyMessage: NotifyMessageService, private modalRef: ModalRefService, private employeeHttp: EmployeeHttpService) {}

  ngOnInit() {

  }

  addEmployee(event) {    // mudanças para adicionar e mandar pra API. Também com fechamento automático da modal
    this.employeeHttp.create(this.employee).subscribe(data => this.modalRef.hide({employee: data, submitted: true}));
    this.notifyMessage.success('Parabéns!', `O empregado <strong>${this.employee.name}</strong> foi criado com sucesso!`);
  }
}
