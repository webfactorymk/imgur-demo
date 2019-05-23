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

  get sidenavState(): SidenavState {
    return this._sidenavState.getValue();
  }

  set sidenavState(sidenavState: SidenavState) {
    this._sidenavState.next(sidenavState);
  }
}
