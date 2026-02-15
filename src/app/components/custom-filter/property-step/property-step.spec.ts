import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyStep } from './property-step';

describe('PropertyStep', () => {
  let component: PropertyStep;
  let fixture: ComponentFixture<PropertyStep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyStep],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
