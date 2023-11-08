import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/admin/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  dashBoard: boolean = true;
  users: boolean = false;
  constructor(private _authService: AuthService) {}

  goToDash() {
    this.dashBoard = true;
    this.users = false;
  }

  goToUsers() {
    this.dashBoard = false;
    this.users = true;
  }

  logout() {
    Swal.fire({
      title: 'Do you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this._authService.adminLogout();
      }
    });
  }
}
