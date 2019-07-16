import { Component, OnInit, ElementRef, Output, Input, EventEmitter } from '@angular/core'
import { Employee } from '../../services/employee.service'
import * as $ from 'jquery'

@Component({
	selector: 'employee-edit',
	templateUrl: './employee-edit.component.html',
	styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

	@Input()
	employee: Employee

	@Output()
	onSubmit: EventEmitter<Employee> = new EventEmitter<Employee>()

	constructor(private element: ElementRef) { }

	ngOnInit() {
	}

	addEmployee(event) {
		const copy = Object.assign({}, this.employee)
		this.onSubmit.emit(copy)
		this.hide()
	}

	hide() {
		const divModal = this.getDivModal()
		$(divModal).hide()
	}

	showModal() {
		const divModal = this.getDivModal()
		$(divModal).show()
	}

	private getDivModal(): HTMLElement {
		const nativeElement: HTMLElement = this.element.nativeElement
		return nativeElement.firstChild.firstChild as HTMLElement
	}
}
