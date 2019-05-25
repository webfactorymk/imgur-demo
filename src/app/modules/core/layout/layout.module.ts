import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LayoutComponent} from './components/layout/layout.component';
import {MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {SidenavService} from './services/sidenav.service';
import {SidenavComponent} from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [SidenavService]
})
export class LayoutModule {
}
