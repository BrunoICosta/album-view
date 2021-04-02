import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signUp() {
    if (!this.username || !this.password) {
      this._snackBar.open('Usuário ou senha não preenchidos.', 'Ok', {
        duration: 2000,
      });
      return;
    }

    try {
      this.authenticationService.signUp(this.username, this.password);
      this._snackBar.open('Usuário criado com sucesso!', 'Ok', {
        duration: 2000,
      });
      this.router.navigate(['/login'], { state: { username: this.username } });
    } catch (e) {
      if (e.message === 'user-already-exists') {
        this._snackBar.open('Usuário já existe.', 'Ok', {
          duration: 2000,
        });
      }
    }
  }
}
