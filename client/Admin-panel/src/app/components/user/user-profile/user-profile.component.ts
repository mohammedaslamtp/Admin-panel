import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { apiRes } from 'src/app/models/api_res';
import { userData } from 'src/app/models/userModel';
import {
  UserAuthService,
  authId,
} from 'src/app/services/user/user-auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userId!: string;
  userData!: userData;
  subs_userData!: Subscription;
  constructor(private _userService: UserAuthService, private _router: Router) {}
  ngOnInit(): void {
    this.subs_userData = this._userService.getData().subscribe(
      (res: apiRes) => {
        if (res) {
          this.userData = res.data as userData;
        }
      },
      (e) => {
        this._router.navigate(['**']);
      }
    );
  }

  logout = () => this._userService.logout();

  ngOnDestroy(): void {
    this.subs_userData?.unsubscribe();
  }
}
