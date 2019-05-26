import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailsDialogComponent } from './image-details-dialog.component';

describe('ImageDetailsDialogComponent', () => {
  let component: ImageDetailsDialogComponent;
  let fixture: ComponentFixture<ImageDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
