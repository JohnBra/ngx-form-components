import { TestBed } from '@angular/core/testing';

import { NgxFormComponentsService } from './ngx-form-components.service';

describe('NgxFormComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFormComponentsService = TestBed.get(NgxFormComponentsService);
    expect(service).toBeTruthy();
  });
});
