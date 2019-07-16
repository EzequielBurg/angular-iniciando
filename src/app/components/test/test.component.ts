import { Component, OnInit } from '@angular/core';
                  //o angular nao permite usar 2 ng-content no mesmo arquivo. Porem se usarmos um select, ele insere o
                  //conteudo apenas no marcador informado no select

@Component({
  selector: 'app-test',
  template: `
    <p>
      <ng-content select="div"></ng-content>
    </p>

    <p>
      <ng-content></ng-content>
    </p>
  `,
  styles: []
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
