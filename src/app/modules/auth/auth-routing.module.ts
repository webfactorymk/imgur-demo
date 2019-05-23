import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
