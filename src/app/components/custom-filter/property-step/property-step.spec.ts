import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PropertyStep } from './property-step';
import { FilterFormService } from '../../../services/filter-form.service';

describe('PropertyStep', () => {
  let component: PropertyStep;
  let fixture: ComponentFixture<PropertyStep>;
  let formService: FilterFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyStep, ReactiveFormsModule],
      providers: [provideZonelessChangeDetection(), FilterFormService, FormBuilder],
    }).compileComponents();

    formService = TestBed.inject(FilterFormService);
    fixture = TestBed.createComponent(PropertyStep);
    component = fixture.componentInstance;
    component.eventForm = formService.createEventGroup();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
