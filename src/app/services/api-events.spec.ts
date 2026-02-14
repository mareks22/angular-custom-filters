import { TestBed } from '@angular/core/testing';

import { ApiEvents } from './api-events';

describe('ApiEvents', () => {
  let service: ApiEvents;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEvents);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
