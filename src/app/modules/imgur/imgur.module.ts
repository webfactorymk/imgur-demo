import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverviewComponent} from './components/overview/overview.component';
import {ImgurRoutingModule} from './imgur-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    ImgurRoutingModule,
    ScrollingModule
  ]
})
export class ImgurModule {
}
