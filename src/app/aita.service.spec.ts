import { TestBed } from '@angular/core/testing';

import { AitaService } from './aita.service';

describe('AitaService', () => {
  let service: AitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
