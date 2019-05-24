import {LayoutService} from './layout.service';
import {SidenavState} from '../sidenav-state.enum';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    service = new LayoutService();
  });

  it('#sidenavState$ should initially be expanded', (done: DoneFn) => {
    service.sidenavState$.subscribe((sidenavState) => {
      expect(sidenavState).toBe(SidenavState.Expanded);
      done();
    });
  });

  it('set sidenavState should correctly update the sidenavState value', (done: DoneFn) => {
    service.sidenavState = SidenavState.Collapsed;

    service.sidenavState$.subscribe((sidenavState) => {
      expect(sidenavState).toBe(SidenavState.Collapsed);
      done();
    });
  });
});
