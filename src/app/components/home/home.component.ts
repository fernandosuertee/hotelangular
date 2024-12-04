import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  

  loginService = inject(LoginService);

  constructor(private router: Router, ) {
  }

  navigateTo(path: string) {
    this.router.navigate([`${path}`]);
  }

  logout() {
    this.loginService.removerToken();
    this.router.navigate(['/login']);
  }
  
}
