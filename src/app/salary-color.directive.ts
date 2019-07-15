import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[salaryColor]'
})
export class SalaryColorDirective {

  constructor(private element: ElementRef) {}

  @Input()
  set salaryColor(value) {          //set transforma um método em uma variável, permitindo o uso do decorator Input
    const nativeElement: HTMLElement = this.element.nativeElement;  //ajuda tambem quando um metodo tem que ser reatribuido
    const salary = parseFloat(value);
    nativeElement.style.color = salary > 3000 ? 'green' : '';
  }
}
