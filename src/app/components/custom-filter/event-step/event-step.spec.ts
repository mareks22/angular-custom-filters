import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStep } from './event-step';

describe('EventStep', () => {
  let component: EventStep;
  let fixture: ComponentFixture<EventStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventStep],
    }).compileComponents();

    fixture = TestBed.createComponent(EventStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
