import {SidenavService} from './sidenav.service';
import {TestBed} from '@angular/core/testing';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BehaviorSubject, of} from 'rxjs';
import {SidenavVisibilityState} from '../models/sidenav-visibility-state.enum';

describe('SidenavService', () => {
  let service: SidenavService;

  let breakpointObserverService: BreakpointObserver;
  let breakpointObserverIsMatchedSpy;
  let breakpointObserverSubscriptionSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [SidenavService]});

    breakpointObserverService = TestBed.get(BreakpointObserver);

    breakpointObserverIsMatchedSpy =
      spyOn(breakpointObserverService, 'isMatched')
        .and.returnValue(false);

    breakpointObserverSubscriptionSpy =
      spyOn(breakpointObserverService, 'observe')
        .and.returnValue(of({matches: false}));
  });

  it('#sidenavState$ should initially be mode: side and value: expanded for tablets and above', (done: DoneFn) => {
    service = TestBed.get(SidenavService);
    service.sidenavState$.subscribe((sidenavState) => {
      expect(sidenavState.value).toBe(SidenavVisibilityState.Expanded);
      expect(sidenavState.mode).toBe('side');
      done();
    });
  });

  it('#sidenavState$ should initially be mode: over and value: collapsed for handsets', (done: DoneFn) => {
    breakpointObserverIsMatchedSpy.and.returnValue(true);
    breakpointObserverSubscriptionSpy.and.returnValue(of({matches: true}));
    service = TestBed.get(SidenavService);

    service.sidenavState$.subscribe((sidenavState) => {
      expect(sidenavState.value).toBe(SidenavVisibilityState.Collapsed);
      expect(sidenavState.mode).toBe('over');
      done();
    });
  });

  it('should collapse sidenav if it was EXPANDED and we switched to a handset device size', (done: DoneFn) => {
    // Initially expanded since we are returning false for handset check
    const subject = new BehaviorSubject({matches: false});
    breakpointObserverSubscriptionSpy.and.returnValue(subject.asObservable());
    service = TestBed.get(SidenavService);

    // Set the breakpointObserver to match a handset device
    subject.next({matches: true});

    service.sidenavState$.subscribe((sidenavState) => {
      expect(sidenavState.value).toBe(SidenavVisibilityState.Collapsed);
      expect(sidenavState.mode).toBe('over');
      done();
    });
  });

  it('should not collapse sidenav if it was EXPANDED and we switched from a handset to something bigger',
    (done: DoneFn) => {
      // Initially expanded since we are returning false for handset check
      breakpointObserverIsMatchedSpy.and.returnValue(true);

      const subject = new BehaviorSubject({matches: true});
      breakpointObserverSubscriptionSpy.and.returnValue(subject.asObservable());

      service = TestBed.get(SidenavService);

      service.toggleSidenav();

      // Set the breakpointObserver to match a handset device
      subject.next({matches: false});

      service.sidenavState$.subscribe((sidenavState) => {
        expect(sidenavState.value).toBe(SidenavVisibilityState.Expanded);
        expect(sidenavState.mode).toBe('side');
        done();
      });
    });

  it('should always collapse the sidenav when we request it',
    (done: DoneFn) => {
      // With the default settings, it will be expanded
      service = TestBed.get(SidenavService);

      service.collapseSidenav();

      service.sidenavState$.subscribe((sidenavState) => {
        expect(sidenavState.value).toBe(SidenavVisibilityState.Collapsed);
        done();
      });
    });

  it('should correctly toggle sidenav',
    (done: DoneFn) => {
      // With the default settings, it will be expanded
      service = TestBed.get(SidenavService);

      service.toggleSidenav();

      service.sidenavState$.subscribe((sidenavState) => {
        expect(sidenavState.value).toBe(SidenavVisibilityState.Collapsed);
        done();
      });
    });

  it('should correctly add a new item to the sidenav',
    (done: DoneFn) => {
      // With the default settings, it will be expanded
      service = TestBed.get(SidenavService);

      service.addItem({
        name: 'Test item'
      });

      service.sidenavItems$.subscribe((sidenavItems) => {
        const sidenavItemIndex = sidenavItems.findIndex((item) => item.name === 'Test item');
        expect(sidenavItemIndex).toBeGreaterThan(-1);
        done();
      });
    });

  it('should override an existing item with the new values if it\'s already in the sidenav',
    (done: DoneFn) => {
      // With the default settings, it will be expanded
      service = TestBed.get(SidenavService);

      service.addItem({
        name: 'Test item'
      });

      service.addItem({
        name: 'Test item',
        matIconName: 'test'
      });

      service.sidenavItems$.subscribe((sidenavItems) => {
        const sidenavItemIndex = sidenavItems.findIndex((item) => item.name === 'Test item');
        expect(sidenavItemIndex).toBeGreaterThan(-1);
        expect(sidenavItems[sidenavItemIndex].matIconName).toBe('test');
        done();
      });
    });
});
