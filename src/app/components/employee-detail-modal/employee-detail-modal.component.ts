import { Component, OnInit, Input, ViewChild, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Modalable } from '../modal/modalable';
import { Employee } from '../../services/employee.service';

@Component({
  selector: 'employee-detail-modal',
  templateUrl: './employee-detail-modal.component.html',
  styleUrls: ['./employee-detail-modal.component.css']
})
export class EmployeeDetailModalComponent extends Modalable implements OnInit {

  @Input()
  employee: Employee;

  @Output()
  onDetail: EventEmitter<Employee> = new EventEmitter<Employee>()

  @ViewChild('notBonus', { static: true })
  template: TemplateRef<any>;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    console.log(this.template);
  }

}
