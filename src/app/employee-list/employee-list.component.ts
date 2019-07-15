import { Component, OnInit, ViewChild } from '@angular/core';
import employees from '../employees'
import { EmployeeService, Employee } from '../employee.service'
import { EmployeeNewModalComponent } from '../employee-new-modal/employee-new-modal.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';

@Component({
	selector: 'employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
	employee:Employee
	showMessageSuccess = false
	employeeToEdit:Employee

	@ViewChild(EmployeeNewModalComponent, { static: true }) //pegar uma referencia de algum componente (no caso a primeira div)
	employeeNewModal: EmployeeNewModalComponent

	@ViewChild(EmployeeEditComponent, { static: true }) //pegar uma referencia de algum componente (no caso a primeira div)
	employeeEdit: EmployeeEditComponent

	constructor(public employeeService: EmployeeService) {
	}

	ngOnInit() {
	}

	openNewModal() {
		this.employeeNewModal.showModal()
	}

	openEdit(employee:Employee) {
		this.employee = employee
		this.employeeEdit.showModal()
	}

	onNewEmployee(employee: Employee) {
		this.employee = employee
		this.showMessageSuccess = true
	}

	onEditEmployee(employee: Employee) {
		console.log(employee);
	}
}
