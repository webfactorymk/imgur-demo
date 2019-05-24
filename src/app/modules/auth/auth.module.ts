import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoadingOverlayModule} from '../shared/loading-overlay/loading-overlay.module';
import {LoginComponent} from './components/login/login.component';
import {CallbackComponent} from './components/callback/callback.component';

@NgModule({
  declarations: [LoginComponent, CallbackComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoadingOverlayModule
  ]
})
export class AuthModule {
}
