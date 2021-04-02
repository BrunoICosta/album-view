import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    const username = this.router.getCurrentNavigation()?.extras?.state
      ?.username;
    if (username) {
      this.username = username;
    }
  }

  ngOnInit(): void { }

  validateLocal() {
    let local = localStorage.users;
    if (local === undefined || local === null) {
      return true;
    } else {
      return false;
    }
  }

  signIn() {
    if (!this.username || !this.password) {
      this._snackBar.open('Usuário ou senha não preenchidos.', 'Ok', {
        duration: 2000,
      });
      return;
    }

    try {
      const user = this.authenticationService.login(
        this.username,
        this.password
      );

      if (user) {
        this.router.navigate(['/']);
      }
    } catch (e) {
      if (e.message === 'invalid-user') {
        this._snackBar.open(
          'Usuário inválido ou não cadastrado! Acesse o link para se cadastro abaixo.',
          'Ok',
          {
            duration: 2000,
          }
        );
      }

      if (e.message === 'invalid-password') {
        this._snackBar.open(
          'Senha inválida! Confira e tente novamente.',
          'Ok',
          {
            duration: 2000,
          }
        );
      }
    }
  }
}
