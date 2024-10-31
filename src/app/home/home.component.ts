import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importe o RouterModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],  // Adicione o RouterModule aqui
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
