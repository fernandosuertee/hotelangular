import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: Login = new Login();
  isLoading: boolean = false; 
  loginService = inject(LoginService);

  router = inject(Router); //equivalente ao @Autowired.... traz uma instância única do roteador para o componente


  constructor(){
    this.loginService.removerToken();
  }

  logar() {

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
   


    this.loginService.logar(this.login).subscribe({
      next: token => {
        this.loginService.addToken(token);
        this.router.navigate(['home']);
      },
      error: erro => {
        Toast.fire({
          icon: "error",
          title: "Usuário ou senha incorretos!"
        });
      }
    })

   
    
  }
}
