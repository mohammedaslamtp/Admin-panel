import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/admin/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnDestroy {
  formData = {
    username: '',
    password: '',
  };

  isLoading: boolean = false;

  usernameError!: string | null;
  passwordError!: string | null;

  subs_auth!: Subscription;

  constructor(private _authService: AuthService, private _router: Router) {}

  onSubmit() {
    this.isLoading = true;
    const username = this.formData.username.replace(/\s/g, '');
    const password = this.formData.password.replace(/\s/g, '');
    // Validate username
    if (!username) {
      this.usernameError = 'Username is required!';
      // this.isLoading
    } else {
      this.usernameError = null;
      if (username.length < 5) {
        this.usernameError = 'Username must be at least 5 characters long!';
      } else {
        this.usernameError = null;
      }
    }

    // Validate password
    if (!password) {
      this.passwordError = 'Password is required!';
    } else {
      this.passwordError = null;
      if (password.length < 8) {
        this.passwordError = 'Password must be at least 8 characters long!';
      } else {
        this.passwordError = null;
      }
    }

    if (!this.usernameError && !this.passwordError) {
      // Form is valid, perform submit action
      this.subs_auth = this._authService
        .adminLogin({ username: username, password: password })
        .subscribe(
          (res) => {
            if (res.data.accessToken) {
              this._authService.storeAdminToken(res.data.accessToken);
              this.isLoading = false;
              this._router.navigate(['/admin/dashboard']);
            }
          },
          (e) => {
            this.isLoading = false;
            if (e.error.message) this.alert(e.error.message, e.error.status);
          }
        );
    }
  }

  alert(msg: string, status: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      showCloseButton: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: status == 404 ? 'error' : 'success',
      title: msg,
    });
  }

  ngOnDestroy(): void {
    this.subs_auth?.unsubscribe();
  }
}
