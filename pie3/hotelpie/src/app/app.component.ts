import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MdbCheckboxModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hotelpie';
}
