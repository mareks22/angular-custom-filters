import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select, SelectChangeEvent } from 'primeng/select';
import { EditableLabel } from '../../Ui/editable-label/editable-label';
import { EventForm, EventSchema, PropertyForm } from '../../../models/event';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { PropertyStep } from '../property-step/property-step';

@Component({
  selector: 'app-event-step',
  imports: [CommonModule, ReactiveFormsModule, Select, EditableLabel, Divider, PropertyStep],
  templateUrl: './event-step.html',
  styleUrl: './event-step.scss',
})
export class EventStep {
  @Input({ required: true }) eventForm!: FormGroup<EventForm>;
  @Input({ required: true }) index!: number;
  @Input({ required: true }) eventOptions: { label: string; value: string }[] = [];
  @Input({ required: true }) eventsList: EventSchema[] = [];
  @Input({ required: true }) isFirst: boolean = false;

  @Output() removeEvent = new EventEmitter<number>();
  @Output() copyEvent = new EventEmitter<any>();

  get eventType(): string | null {
    return this.eventForm.controls.type.value;
  }

  get properties(): FormArray<FormGroup<PropertyForm>> {
    return this.eventForm.controls.properties;
  }

  onEventTypeChange(event: SelectChangeEvent) {
    const currentName = this.eventForm.controls['name'].value;
    if (!currentName || currentName === 'Unnamed step') {
      this.eventForm.controls['name'].setValue(event.value);
    }
    while (this.properties.length !== 0) {
      this.properties.removeAt(0);
    }
  }

  onCopyEvent() {
    this.copyEvent.emit(this.eventForm.value);
  }
}
