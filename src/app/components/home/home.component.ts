import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin();
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  logout() {
    this.authService.logout(); // Lógica de logout no AuthService
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
