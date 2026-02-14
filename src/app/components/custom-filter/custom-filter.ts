import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ApiEvents } from '../../services/api-events';
import { EventForm, EventSchema, FilterForm, PropertyForm } from '../../models/event';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventStep } from './event-step/event-step';

@Component({
  selector: 'app-custom-filter',
  imports: [ButtonModule, ReactiveFormsModule, CommonModule, EventStep],
  templateUrl: './custom-filter.html',
  styleUrl: './custom-filter.scss',
})
export class CustomFilter implements OnInit {
  private api = inject(ApiEvents);
  private fb = inject(FormBuilder);

  eventsList = signal<EventSchema[]>([]);
  eventOptions = signal<{ label: string; value: string }[]>([]);

  form: FormGroup<FilterForm> = this.fb.group({
    events: this.fb.array<FormGroup<EventForm>>([]),
  });

  ngOnInit() {
    this.getEventsList();
    this.addEvent();
  }

  getEventsList() {
    this.api.getEvents().subscribe((data) => {
      this.eventsList.set(data.events);
      this.eventOptions.set(data.events.map((e) => ({ label: e.type, value: e.type })));
    });
  }

  get events(): FormArray<FormGroup<EventForm>> {
    return this.form.get('events') as FormArray<FormGroup<EventForm>>;
  }

  eventGroup(): FormGroup<EventForm> {
    return this.fb.group<EventForm>({
      type: this.fb.control('', { validators: [Validators.required], nonNullable: false }),
      name: this.fb.control('Unnamed step', { validators: [Validators.required], nonNullable: false }),
      properties: this.fb.array<FormGroup<PropertyForm>>([]),
    });
  }
  addEvent(): void {
    this.events.push(this.eventGroup());
  }

  removeEvent(index: number): void {
    this.events.removeAt(index);
  }

  copyEvent(event: any): void {
    const eventGroup = this.eventGroup();
    eventGroup.patchValue({
      type: event.type,
      name: event.name,
    });

    const propertiesArray = eventGroup.controls.properties;
    if (event.properties && Array.isArray(event.properties)) {
      event.properties.forEach((prop: any) => {
        propertiesArray.push(this.fb.group<PropertyForm>({
          name: this.fb.control(prop.name, { validators: [Validators.required], nonNullable: false }),
          type: this.fb.control(prop.type, { nonNullable: false }),
          value: this.fb.control(prop.value, { nonNullable: false }),
          valueTo: this.fb.control(prop.valueTo, { nonNullable: false }),
          operator: this.fb.control(prop.operator || 'equals', { nonNullable: false })
        }));
      });
    }

    this.events.push(eventGroup);
  }

  asFormGroup(abstractControl: any): FormGroup<EventForm> {
    return abstractControl as FormGroup<EventForm>;
  }

  submit(): void {
    console.log(this.form.value);
  }
}
