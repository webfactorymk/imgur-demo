import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './modules/core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'imgur',
        loadChildren: './modules/imgur/imgur.module#ImgurModule'
      },
      {path: '', redirectTo: 'imgur', pathMatch: 'full'},
      {path: '**', redirectTo: 'imgur', pathMatch: 'full'}
    ],
    canActivate: []
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {path: 'login', redirectTo: 'auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
