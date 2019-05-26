import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoadingOverlayModule} from '../../../shared/loading-overlay/loading-overlay.module';
import {LoginComponent} from './components/login/login.component';
import {CallbackComponent} from './components/callback/callback.component';
import {CanActivateLoginGuard} from './common/services/can-activate-login.guard';
import {CanActivateLoginCallbackGuard} from './common/services/can-activate-login-callback.guard';
import {LoadingSpinnerModule} from '../../../shared/loading-spinner/loading-spinner.module';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    AuthRoutingModule,
    LoadingOverlayModule,
    LoadingSpinnerModule
  ],
  declarations: [LoginComponent, CallbackComponent],
  providers: [CanActivateLoginGuard, CanActivateLoginCallbackGuard]
})
export class AuthModule {
}
