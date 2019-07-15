import { Injectable } from '@angular/core';

export interface Employee{
  name:string
  salary:number
  bonus:number
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = [
    {name: 'Rafael Borges', salary: 1800, bonus: 300},
    {name: 'Chica Maria', salary:1100, bonus: 1350}
  ]

  constructor() { }

  addEmployee(employee: Employee) {
    employee.bonus = employee.salary >= 2000 ? 0 : employee.bonus;
    this.employees.push(employee);
}

}
