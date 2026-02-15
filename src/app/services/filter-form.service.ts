import {inject, Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventForm, PropertyForm, FilterForm, EventValue, FilterResult} from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class FilterFormService {
  private fb = inject(FormBuilder);

  createFilterForm(): FormGroup<FilterForm> {
    return this.fb.group({
      events: this.fb.array<FormGroup<EventForm>>([]),
    });
  }

  createEventGroup(type: string = '', name: string = 'Unnamed step'): FormGroup<EventForm> {
    return this.fb.group<EventForm>({
      type: this.fb.control(type, {validators: [Validators.required], nonNullable: false}),
      name: this.fb.control(name, {validators: [Validators.required], nonNullable: false}),
      properties: this.fb.array<FormGroup<PropertyForm>>([]),
    });
  }

  createPropertyForm(data?: Partial<{
    name: string | null;
    type: string | null;
    value: string | null;
    valueTo: string | null;
    operator: string | null
  }>): FormGroup<PropertyForm> {
    return this.fb.group<PropertyForm>({
      name: this.fb.control(data?.name ?? '', {validators: [Validators.required], nonNullable: false}),
      type: this.fb.control(data?.type ?? '', {nonNullable: false}),
      value: this.fb.control(data?.value ?? '', {nonNullable: false}),
      valueTo: this.fb.control(data?.valueTo ?? '', {nonNullable: false}),
      operator: this.fb.control(data?.operator ?? 'equals', {nonNullable: false})
    });
  }

  copyEventGroup(eventValue: Partial<EventValue>): FormGroup<EventForm> {
    const eventGroup = this.createEventGroup(eventValue.type ?? '', eventValue.name ?? 'Unnamed step');

    if (eventValue.properties && Array.isArray(eventValue.properties)) {
      eventValue.properties.forEach((prop) => {
        eventGroup.controls.properties.push(this.createPropertyForm(prop));
      });
    }

    return eventGroup;
  }

  getFilterData(form: FormGroup<FilterForm>): FilterResult {
    const rawValue = form.getRawValue();

    return {
      steps: rawValue.events.map(event => ({
        event_type: event.type || '',
        display_name: event.name || '',
        filters: event.properties.map(prop => ({
          attribute: prop.name || '',
          operator: prop.operator || '',
          value: prop.value || '',
          // Only include valueTo if operator is 'in between'
          ...(prop.operator === 'in between' ? {value_to: prop.valueTo} : {}),
          type: (prop.type as 'string' | 'number') || 'string'
        }))
      }))
    };
  }
}
