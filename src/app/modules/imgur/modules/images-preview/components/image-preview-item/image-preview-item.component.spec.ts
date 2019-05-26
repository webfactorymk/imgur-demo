import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewItemComponent } from './image-preview-item.component';

describe('ImagePreviewItemComponent', () => {
  let component: ImagePreviewItemComponent;
  let fixture: ComponentFixture<ImagePreviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePreviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
