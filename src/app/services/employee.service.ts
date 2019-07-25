import { Injectable } from '@angular/core';

export interface Employee {
  readonly id?: number;
  name: string;
  salary: number;
  bonus: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] /* = [
    { name: 'Rafael Borges', salary: 1800, bonus: 300 },
    { name: 'Chica Maria', salary: 1100, bonus: 5 },
    { name: 'José Alfredo', salary: 2360, bonus: 10 },
    { name: 'Clodoaldo Santana', salary: 1120, bonus: 100 },
    { name: 'Gerônsio Albuquerque', salary: 1642, bonus: 1000 }
  ] */;

  constructor() { }

  addEmployee(employee: Employee) {
    employee.bonus = employee.salary >= 2000 ? 0 : employee.bonus;
    this.employees.push(employee);
  }

  destroyEmployee(employee: Employee) {
    const index = this.employees.indexOf(employee);
    this.employees.splice(index, 1);
  }

}
