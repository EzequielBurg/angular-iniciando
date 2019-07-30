import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[sortColumn]',    // [ ] torna o seletor um atributo html
  template: `
    <a href="javascript:void(0)" style="text-decoration: none;">
      <ng-content></ng-content>&nbsp;
      <i class="fas" [ngClass]="{'fa-caret-down': showArrowDown(), 'fa-caret-up': showArrowUp()}"></i>
    </a>
  `,
  styles: []
})

export class SortColumnComponent implements OnInit {

  @Input()
  sortColumn: {column, sort};

  @Input()
  columnName;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSort = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click')
  changeSort() {
    this.sortColumn.column = this.columnName;
    this.sortColumn.sort   = this.sortColumn.sort === 'desc' ? 'asc' : 'desc';
    this.onSort.emit(this.sortColumn);
  }

  showArrowDown() {
    return this.columnName === this.sortColumn.column && this.sortColumn.sort === 'desc';
  }

  showArrowUp() {
    return this.columnName === this.sortColumn.column && this.sortColumn.sort === 'asc';
  }

}
