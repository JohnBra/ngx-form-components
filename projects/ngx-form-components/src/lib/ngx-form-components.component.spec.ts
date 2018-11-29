import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormComponentsComponent } from './ngx-form-components.component';

describe('NgxFormComponentsComponent', () => {
  let component: NgxFormComponentsComponent;
  let fixture: ComponentFixture<NgxFormComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFormComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
