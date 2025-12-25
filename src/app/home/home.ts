import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class Home {

}
