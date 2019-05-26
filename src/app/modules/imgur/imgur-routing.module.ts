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
    children: [
      {
        path: 'top-images',
        component: TopImagesComponent,
        canActivate: [CanActivateImgurContentGuard]
      },
      {
        path: 'account-images',
        component: AccountImagesComponent,
        canActivate: [CanActivateImgurContentGuard]
      },
      {
        path: 'upload',
        component: ImagesUploadComponent,
        canActivate: [CanActivateImgurContentGuard]
      },
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
      },
      {path: 'login', redirectTo: 'auth/login', pathMatch: 'full'},
      {path: '', redirectTo: 'top-images', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ImgurRoutingModule {
}
