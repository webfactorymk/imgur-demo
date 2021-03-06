import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgurRoutingModule} from './imgur-routing.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {ImgurComponent} from './components/imgur/imgur.component';
import {ImagesUploadComponent} from './components/images-upload/images-upload.component';
import {CanvasWhiteboardModule} from 'ng2-canvas-whiteboard';
import {LoadingOverlayModule} from '../shared/loading-overlay/loading-overlay.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FileDropModule} from 'ngx-file-drop';
import {ConfirmationDialogModule} from '../shared/confirmation-dialog/confirmation-dialog.module';
import {AccountImagesComponent} from './components/account-images/account-images.component';
import {ImagesPreviewModule} from './modules/images-preview/images-preview.module';
import {TopImagesComponent} from './components/top-images/top-images.component';
import {CanActivateImgurContentGuard} from './common/services/can-activate-imgur-content.guard';
import {ImgurAuthService} from './modules/auth/common/services/imgur-auth.service';
import {SidenavItem} from '../core/layout/components/sidenav/sidenav-item/sidenav-item.interface';
import {SidenavService} from '../core/layout/common/services/sidenav.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImgurRoutingModule,
    ScrollingModule,
    MatDialogModule,
    MatButtonModule,
    LoadingOverlayModule,
    CanvasWhiteboardModule,
    FileDropModule,
    ConfirmationDialogModule,
    ImagesPreviewModule
  ],
  declarations: [
    ImgurComponent,
    ImagesUploadComponent,
    AccountImagesComponent,
    TopImagesComponent
  ],
  providers: [
    CanActivateImgurContentGuard
  ]
})
export class ImgurModule {
}
