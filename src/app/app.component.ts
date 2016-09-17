import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <router-outlet></router-outlet>
    `
})
export class AppComponent { }
