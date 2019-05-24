import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SidenavState} from '../sidenav-state.enum';

@Injectable()
export class LayoutService {
  private _sidenavState: BehaviorSubject<SidenavState>;
  sidenavState$: Observable<SidenavState>;

  constructor() {
    this._sidenavState = new BehaviorSubject<SidenavState>(SidenavState.Expanded);
    this.sidenavState$ = this._sidenavState.asObservable();
  }

  private get sidenavState(): SidenavState {
    return this._sidenavState.getValue();
  }

  private set sidenavState(sidenavState: SidenavState) {
    this._sidenavState.next(sidenavState);
  }

  toggleSidenav(): void {
    this.sidenavState = this.sidenavState === SidenavState.Expanded
      ? SidenavState.Collapsed
      : SidenavState.Expanded;
  }

  expandSidenav(): void {
    this.sidenavState = SidenavState.Expanded;
  }

  isSidenavExpanded(): boolean {
    return this.sidenavState === SidenavState.Expanded;
  }


  collapseSidenav(): void {
    this.sidenavState = SidenavState.Collapsed;
  }

  isSidenavCollapsed(): boolean {
    return this.sidenavState === SidenavState.Collapsed;
  }

}
