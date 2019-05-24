import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryItemDetailsDialogComponent } from './gallery-item-details-dialog.component';

describe('GalleryItemDetailsDialogComponent', () => {
  let component: GalleryItemDetailsDialogComponent;
  let fixture: ComponentFixture<GalleryItemDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryItemDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryItemDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
