import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EventStep } from './event-step';
import { FilterFormService } from '../../../services/filter-form.service';

describe('EventStep', () => {
  let component: EventStep;
  let fixture: ComponentFixture<EventStep>;
  let formService: FilterFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventStep, ReactiveFormsModule],
      providers: [provideZonelessChangeDetection(), FilterFormService, FormBuilder],
    }).compileComponents();

    formService = TestBed.inject(FilterFormService);
    fixture = TestBed.createComponent(EventStep);
    component = fixture.componentInstance;
    component.eventForm = formService.createEventGroup();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
