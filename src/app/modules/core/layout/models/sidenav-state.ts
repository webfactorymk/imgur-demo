import {SidenavVisibilityState} from './sidenav-visibility-state.enum';

export interface SidenavState {
  value: SidenavVisibilityState;
  mode: 'side' | 'over';
}
