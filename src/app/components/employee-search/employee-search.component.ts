import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'employee-search',
  template: `
    <form (submit)="submit()">
      <div class="form-row">
        <div class="col-11">
          <input type="search" class="form-control" name="search" placeholder="Digite aqui para buscar" [(ngModel)]="search">
        </div>
        <div class="col-1">
          <button type="submit" class="btn btn-primary" title="Buscar">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  `,
  styles: []
})

export class EmployeeSearchComponent implements OnInit {

  search = '';

  constructor() { }

  ngOnInit() {
  }

  submit() {

  }

}
