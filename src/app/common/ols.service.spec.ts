import { TestBed } from '@angular/core/testing';

import { OlsService } from './ols.service';

describe('OlsService', () => {
  let service: OlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
