import { TestBed, inject } from '@angular/core/testing';

import { DataCommService } from './data-comm.service';

describe('DataCommService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCommService]
    });
  });

  it('should be created', inject([DataCommService], (service: DataCommService) => {
    expect(service).toBeTruthy();
  }));
});
