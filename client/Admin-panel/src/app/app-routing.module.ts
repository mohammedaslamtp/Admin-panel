import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { adminAuthGuard } from './admin-guards/admin-auth.guard';
import { adminDashGuard } from './admin-guards/admin-dash.guard';
import { LayoutComponent } from './components/admin/layout/layout.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { ErrorComponent } from './components/error/error.component';
import { userLoginGuard } from './user-guards/user-login.guard';
import { userProfileGuard } from './user-guards/user-profile.guard';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent,
    canActivate: [userLoginGuard],
  },
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [userProfileGuard],
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [userProfileGuard],
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [adminAuthGuard],
  },
  { path: 'admin', component: LayoutComponent, canActivate: [adminDashGuard] },
  {
    path: 'admin/editUser/:id',
    component: EditUserComponent,
    canActivate: [adminDashGuard],
  },
  {
    path: 'admin/dashboard',
    component: LayoutComponent,
    canActivate: [adminDashGuard],
  },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
