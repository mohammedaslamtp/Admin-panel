import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { userData } from 'src/app/models/userModel';
import { ActionService } from 'src/app/services/admin/action.service';
import { DataService } from 'src/app/services/admin/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  editForm = {
    username: '',
    full_name: '',
    email: '',
    phone: '',
  };

  constructor(
    private _actionService: ActionService,
    private _dataService: DataService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  userData!: any;
  subs_userData!: Subscription;
  subs_param!: Subscription;
  userId!: string;

  ngOnInit(): void {
    this.subs_param = this._activatedRoute.params.subscribe(
      (params) => {
        const paramValue = params['id'];
        this.userId = paramValue;
      },
      (e) => {
        this._router.navigate(['**']);
      }
    );
    this.subs_userData = this._dataService.getUser(this.userId).subscribe(
      (res) => {
        if (res) {
          this.userData = res.data;
        }
      },
      (e) => {
        this._router.navigate(['**']);
      }
    );
  }

  usernameError!: string | null;
  phoneError!: string | null;
  emailError!: string | null;
  fullNameError!: string | null;
  subs_editUser!: Subscription;

  edit(id: string) {
    const username = this.editForm.username.replace(/\s/g, '');
    const phone = this.editForm.phone.replace(/\s/g, '');
    const full_name = this.editForm.full_name
      .replace(/\s/g, ' ')
      .trimStart()
      .trimEnd();
    const email = this.editForm.email.replace(/\s/g, '');

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

    if (!full_name) {
      this.fullNameError = 'Full name is required!';
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
      !this.fullNameError &&
      !this.emailError &&
      !this.phoneError
    ) {
      this._actionService.editUser(this.editForm as userData, id).subscribe(
        (res) => {
          if (res) {
            this.alert(res.message, 200);
          }
        },
        (e) => {
          this.alert(e.error.message, 404);
        }
      );
    }

    this.subs_editUser = this._actionService
      .editUser(this.editForm as userData, id)
      .subscribe(
        (res) => {
          if (res) {
            this.alert(res.message, 200);
          }
        },
        (err) => {
          this.alert(err.error.message, 404);
        }
      );
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
      didClose: () => {
        if (status == 200) this._router.navigate(['/admin/dashboard']);
      },
    });
    Toast.fire({
      icon: status == 404 ? 'error' : 'success',
      title: msg,
    });
  }

  ngOnDestroy(): void {
    this.subs_param?.unsubscribe();
    this.subs_userData?.unsubscribe();
    this.subs_editUser?.unsubscribe();
  }
}
