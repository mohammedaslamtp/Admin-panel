import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userData } from 'src/app/models/userModel';
import { ActionService } from 'src/app/services/admin/action.service';
import { DataService } from 'src/app/services/admin/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  usersData: Array<userData> = [];
  subs_usersData!: Subscription;
  constructor(
    private _dataService: DataService,
    private _actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.fetchAllUsersData();
  }

  fetchAllUsersData() {
    this.subs_usersData = this._dataService.getUsersData().subscribe((res) => {
      this.usersData = res;
    });
  }

  formData = {
    username: '',
    full_name: '',
    email: '',
    phone: '',
    password: '',
  };

  usernameError!: string | null;
  passwordError!: string | null;
  phoneError!: string | null;
  emailError!: string | null;
  fullNameError!: string | null;
  subs_createUser!: Subscription;

  addUser() {
    const username = this.formData.username.replace(/\s/g, '');
    const password = this.formData.password.replace(/\s/g, '');
    const phone = this.formData.phone.replace(/\s/g, '');
    const full_name = this.formData.full_name.replace(/\s/g, '');
    const email = this.formData.email.replace(/\s/g, '');

    if (!username) {
      this.usernameError = 'Username is required!';
    } else {
      this.usernameError = null;
      if (username.length < 5) {
        this.usernameError = 'Username must be at least 5 characters long!';
      } else {
        this.usernameError = null;
      }
    }

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

    if (!full_name) {
      this.fullNameError = 'Full Name is required!';
    } else {
      this.fullNameError = null;
      if (full_name.length < 5) {
        this.fullNameError = 'Full Name must be at least 5 characters long!';
      } else {
        this.fullNameError = null;
      }
    }

    if (!email) {
      this.emailError = 'Email is required and keep email format!';
    } else {
      this.emailError = null;
    }

    if (!phone) {
      this.phoneError = 'Phone number is required!';
    } else {
      this.phoneError = null;
      if (phone.length < 10) {
        this.phoneError = 'Phone number must be at least 10';
      } else {
        this.phoneError = null;
      }
    }

    if (
      !this.usernameError &&
      !this.passwordError &&
      !this.fullNameError &&
      !this.emailError &&
      !this.phoneError
    ) {
      this.subs_createUser = this._actionService
        .createUser(this.formData as userData)
        .subscribe(
          (res) => {
            if (res) {
              this.alert(res.message, res.status);
              this.formData = {
                username: '',
                full_name: '',
                email: '',
                phone: '',
                password: '',
              };
              this;
              this.subs_usersData = this._dataService
                .getUsersData()
                .subscribe((res) => {
                  this.usersData = res;
                });
            }
          },
          (err) => {
            this.alert(err.error.message, 404);
          }
        );
    }
  }

  subs_deleteUser!: Subscription;
  deleteUser(id: string) {
    Swal.fire({
      title: 'Do you want to delete this user?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subs_deleteUser = this._actionService.deleteUser(id).subscribe(
          (res) => {
            if (res) {
              this.fetchAllUsersData();
              this.alert(res.message, 200);
            }
          },
          (e) => {
            this.alert(e.error.message, 404);
          }
        );
      }
    });
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
    this.subs_usersData?.unsubscribe();
    this.subs_createUser?.unsubscribe();
  }
}
