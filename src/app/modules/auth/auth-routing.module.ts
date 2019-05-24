import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanActivateLoginGuard} from './services/can-activate-login.guard';
import {CanActivateLoginCallbackGuard} from './services/can-activate-login-callback.guard';
import {LoginComponent} from './components/login/login.component';
import {CallbackComponent} from './components/callback/callback.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateLoginGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent,
    canActivate: [CanActivateLoginCallbackGuard]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
