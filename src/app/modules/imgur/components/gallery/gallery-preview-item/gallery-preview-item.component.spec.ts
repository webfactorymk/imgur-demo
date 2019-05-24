import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPreviewItemComponent } from './gallery-preview-item.component';

describe('GalleryPreviewItemComponent', () => {
  let component: GalleryPreviewItemComponent;
  let fixture: ComponentFixture<GalleryPreviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryPreviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPreviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
