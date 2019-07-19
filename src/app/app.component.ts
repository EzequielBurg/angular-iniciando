import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  flagLogo = true;
  role = 'admin';
  objContext = {
    name: 'Joao Bolao',
  };


  ngOnInit() {
    setTimeout(() => {
      this.flagLogo = false;
    }, 5000);

    setTimeout(() => {
      this.role = 'manager';
    }, 5000);
  }
}
