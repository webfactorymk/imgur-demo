import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopImagesComponent } from './top-images.component';

describe('TopImagesComponent', () => {
  let component: TopImagesComponent;
  let fixture: ComponentFixture<TopImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
