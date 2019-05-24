import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleryComponent} from './components/gallery/gallery.component';

const routes: Routes = [
  {path: '', redirectTo: 'gallery', pathMatch: 'full'},
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ImgurRoutingModule {
}
