import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgurComponent} from './components/imgur/imgur.component';
import {ImagesUploadComponent} from './components/images-upload/images-upload.component';
import {AccountImagesComponent} from './components/account-images/account-images.component';

const routes: Routes = [
  {
    path: '',
    component: ImgurComponent,
    children: [
      {
        path: 'account-images',
        component: AccountImagesComponent
      },
      {
        path: 'upload',
        component: ImagesUploadComponent
      },
      {path: '', redirectTo: 'account-images', pathMatch: 'full'}
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ImgurRoutingModule {
}
