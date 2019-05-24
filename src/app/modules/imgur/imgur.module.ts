import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './components/overview/overview.component';
import {ImgurRoutingModule} from './imgur-routing.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    ImgurRoutingModule
  ]
})
export class ImgurModule {
}
