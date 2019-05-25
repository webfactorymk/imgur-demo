import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagesPreviewComponent} from './components/images-preview/images-preview.component';
import {ImgurComponent} from './components/imgur/imgur.component';
import {ImagesUploadComponent} from './components/images-upload/images-upload.component';

const routes: Routes = [
  {
    path: '',
    component: ImgurComponent,
    children: [
      {
        path: 'images-preview',
        component: ImagesPreviewComponent
      },
      {
        path: 'upload',
        component: ImagesUploadComponent
      },
      {path: '', redirectTo: 'images-preview', pathMatch: 'full'}
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
