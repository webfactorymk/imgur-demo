import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoadingOverlayModule} from '../shared/loading-overlay/loading-overlay.module';
import {LoginComponent} from './components/login/login.component';
import {CallbackComponent} from './components/callback/callback.component';
import {CanActivateLoginGuard} from './services/can-activate-login.guard';
import {CanActivateLoginCallbackGuard} from './services/can-activate-login-callback.guard';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoadingOverlayModule
  ],
  declarations: [LoginComponent, CallbackComponent],
  providers: [CanActivateLoginGuard, CanActivateLoginCallbackGuard]
})
export class AuthModule {
}
