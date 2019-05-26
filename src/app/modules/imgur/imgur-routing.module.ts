import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgurComponent} from './components/imgur/imgur.component';
import {ImagesUploadComponent} from './components/images-upload/images-upload.component';
import {AccountImagesComponent} from './components/account-images/account-images.component';
import {TopImagesComponent} from './components/top-images/top-images.component';
import {CanActivateImgurContentGuard} from './common/services/can-activate-imgur-content.guard';

const routes: Routes = [
  {
    path: '',
    component: ImgurComponent,
    canActivate: [CanActivateImgurContentGuard],
    children: [
      {
        path: 'top-images',
        component: TopImagesComponent
      },
      {
        path: 'account-images',
        component: AccountImagesComponent
      },
      {
        path: 'upload',
        component: ImagesUploadComponent
      },
      {path: '', redirectTo: 'top-images', pathMatch: 'full'}
    ]
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {path: 'login', redirectTo: 'auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ImgurRoutingModule {
}
