import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iniciando-angular';
  flagLogo = true;

  ngOnInit() {
    setTimeout(() => {
      this.flagLogo = false;
    }, 5000);
  }
}
