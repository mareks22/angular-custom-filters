import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ApiEvents } from '../../services/api-events';
import { EventForm, EventSchema, FilterForm } from '../../models/event';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventStep } from './event-step/event-step';
import { FilterFormService } from '../../services/filter-form.service';

@Component({
  selector: 'app-custom-filter',
  imports: [ButtonModule, ReactiveFormsModule, CommonModule, EventStep],
  templateUrl: './custom-filter.html',
  styleUrl: './custom-filter.scss',
})
export class CustomFilter implements OnInit {
  private api = inject(ApiEvents);
  private formService = inject(FilterFormService);

  eventsList = signal<EventSchema[]>([]);
  eventOptions = signal<{ label: string; value: string }[]>([]);

  form: FormGroup<FilterForm> = this.formService.createFilterForm();

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

  addEvent(): void {
    this.events.push(this.formService.createEventGroup());
  }

  removeEvent(index: number): void {
    this.events.removeAt(index);
  }

  discardForm(): void {
    this.events.clear();
    this.addEvent();
  }

  copyEvent(event: any): void {
    this.events.push(this.formService.copyEventGroup(event));
  }

  asFormGroup(abstractControl: any): FormGroup<EventForm> {
    return abstractControl as FormGroup<EventForm>;
  }

  submit(): void {
    console.log(this.form.value);
  }
}
