import {RouterModule, Routes} from '@angular/router';
import {CanActivateLoginGuard} from '../auth/services/can-activate-login.guard';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './components/overview/overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [CanActivateLoginGuard]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ImgurRoutingModule {
}
