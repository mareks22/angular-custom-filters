import { Component, Input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { EventForm, EventSchema, PropertyForm } from '../../../models/event';
import { InputText } from 'primeng/inputtext';
import { IconTabs, IconTabSchema } from '../../Ui/icon-tabs/icon-tabs';
import { FilterFormService } from '../../../services/filter-form.service';

@Component({
  selector: 'app-property-step',
  imports: [CommonModule, ReactiveFormsModule, Select, Button, InputText, IconTabs],
  templateUrl: './property-step.html',
  styleUrl: './property-step.scss',
})
export class PropertyStep {
  private formService = inject(FilterFormService);

  @Input({ required: true }) eventForm!: FormGroup<EventForm>;
  @Input({ required: true }) eventsList: EventSchema[] = [];
  @Input({ required: true }) eventType!: string | null;

  currentlyHovered = signal<number | null>(null);
  availableProperties = computed(() => {
    const event = this.eventsList.find((e) => e.type === this.eventType);
    return event ? event.properties : [];
  });

  propertyOperator = new Map<string, string[]>([
    ['string', ['equals', 'does not equal', 'contains', 'does not contain']],
    ['number', ['equals', 'greater than', 'less than', 'in between']],
  ]);

  tabs: IconTabSchema[] = [
    {
      icon: 'pi pi-language',
      value: 'string',
      label: 'STRING',
    },
    {
      icon: 'pi pi-filter',
      value: 'number',
      label: 'NUMBER',
    },
  ];

  get properties(): FormArray<FormGroup<PropertyForm>> {
    return this.eventForm.controls.properties;
  }

  addProperty(): void {
    this.properties.push(this.formService.createPropertyForm());
  }

  removeProperty(propIndex: number): void {
    this.properties.removeAt(propIndex);
  }

  onPropertyNameChange(propIndex: number) {
    const propGroup = this.properties.at(propIndex);
    const eventDef = this.eventsList.find((e) => e.type === this.eventType);
    const propDef = eventDef?.properties.find((p) => p.property === propGroup.controls.name.value);

    if (propDef) {
      propGroup.controls.type.setValue(propDef.type);
    }
  }

  getActiveTab(index: number): IconTabSchema | null {
    const type = this.properties.at(index).controls.type.value;
    return this.tabs.find((t) => t.value === type) || null;
  }

  onTabChange(tab: IconTabSchema, index: number) {
    this.properties.at(index).controls.type.setValue(tab.value);
  }
}
