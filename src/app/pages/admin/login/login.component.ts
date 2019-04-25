import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  googleSignin(){
    this.authService.googleLogin()
    .then(() => {
      this.router.navigate(['/user']);
    }).catch(_error => {
      this.error = _error;
      this.router.navigate(['/']);
    });
  }
  onSignUp(): void {
    if (this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/user']);
        }).catch(_error => {
          this.error = _error;
          this.router.navigate(['/']);
        });
    }
  }

  onLoginEmail(email, password): void {

    if (this.validateForm(email, password)) {
      this.authService.loginWithEmail(email, password)
        .then(() => { this.router.navigate(['/admin']); })
        .catch(_error => {
          this.error = _error;
          // this.router.navigate(['/']);
          
        });
    }
  }

  validateForm(email: string, password: string) {
    // validate this.errorMessage
    return true;
  }
}
