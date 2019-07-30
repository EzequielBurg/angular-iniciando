import { Component, OnInit } from '@angular/core';
import { Employee } from '../../services/employee.service';
import { ModalRefService } from '../modal-dynamic/modal-ref.service';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { EmployeeHttpService } from 'src/app/services/employee-http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'employee-delete-modal',
  templateUrl: './employee-delete-modal.component.html',
  styleUrls: ['./employee-delete-modal.component.scss']
})
export class EmployeeDeleteModalComponent implements OnInit {

  employee$: Observable<Employee>;

  employeeId: number;

  error = false;

  constructor(private notifyMessage: NotifyMessageService, private modalRef: ModalRefService, private employeeHttp: EmployeeHttpService) {
    // tslint:disable-next-line: no-string-literal
    this.employeeId = this.modalRef.context['employeeId'];
  }

  ngOnInit() {
    try {
      this.employee$ = this.employeeHttp.get(this.employeeId);
    } catch (e) {
      this.error = true;
    }
  }

  async destroy() {
    const employee = await this.employee$.toPromise();
    this.employeeHttp.delete(this.employeeId).
      subscribe(data => {
        this.modalRef.hide({employee: this.employee$, submitted: true});
        this.notifyMessage.success('Parabéns!', `O empregado <strong>${employee.name}</strong> foi excluído com sucesso!`);
      });
  }
}
