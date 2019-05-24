import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagesPreviewComponent} from './components/images-preview/images-preview.component';

const routes: Routes = [
  {path: '', redirectTo: 'images-preview', pathMatch: 'full'},
  {
    path: 'images-preview',
    component: ImagesPreviewComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ImgurRoutingModule {
}
