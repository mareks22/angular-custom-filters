import {Component, Input, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {Button} from 'primeng/button';
import {EventForm, EventPropertyDefinition, EventSchema, PropertyForm} from '../../../models/event';
import {InputText} from 'primeng/inputtext';
import {IconTab, IconTabSchema} from '../../Ui/icon-tabs/icon-tabs';

@Component({
  selector: 'app-property-step',
  imports: [CommonModule, ReactiveFormsModule, Select, Button, InputText, IconTab],
  templateUrl: './property-step.html',
  styleUrl: './property-step.scss',
})
export class PropertyStep {
  private fb = inject(FormBuilder);

  @Input({required: true}) eventForm!: FormGroup<EventForm>;
  @Input({required: true}) eventsList: EventSchema[] = [];
  @Input({required: true}) eventType!: string | null;

  currentlyHovered = signal<number | null>(null);

  propertyOperator = new Map<string, string[]>([
    ['string', ['equals', 'does not equal', 'contains', 'does not contain']],
    ['number', ['equals', 'greater than', 'less than', 'in between']]
  ]);

  tabs: IconTabSchema[] = [
    {
      icon: 'pi pi-language',
      value: 'string',
      label: 'STRING'
    },
    {
      icon: 'pi pi-filter',
      value: 'number',
      label: 'NUMBER'
    }
  ]

  get properties(): FormArray<FormGroup<PropertyForm>> {
    return this.eventForm.controls.properties;
  }


  addProperty(): void {
    this.properties.push(
      this.fb.group<PropertyForm>({
        name: this.fb.control('', { validators: [Validators.required], nonNullable: false }),
        type: this.fb.control('', { nonNullable: false }),
        value: this.fb.control('', { nonNullable: false }),
        valueTo: this.fb.control('', { nonNullable: false }),
        operator: this.fb.control('equals', { nonNullable: false })
      }),
    );
  }

  removeProperty(propIndex: number): void {
    this.properties.removeAt(propIndex);
  }

  onPropertyNameChange(propIndex: number) {
    const propGroup = this.properties.at(propIndex);
    const eventType = this.eventType;
    const propName = propGroup.controls.name.value;

    const eventDef = this.eventsList.find((e) => e.type === eventType);
    const propDef = eventDef?.properties.find((p) => p.property === propName);

    if (propDef) {
      propGroup.controls.type.setValue(propDef.type);
    }
  }

  getAvailableProperties(): EventPropertyDefinition[] {
    const event = this.eventsList.find((e) => e.type === this.eventType);
    return event ? event.properties : [];
  }

  /**
   * Returns the configuration for the active tab based on the property's data type.
   * This ensures the UI stays in sync when the underlying form model changes.
   */
  getActiveTab(index: number): IconTabSchema | null {
    const type = this.properties.at(index).controls.type.value;
    return this.tabs.find(t => t.value === type) || null;
  }

  onTabChange(tab: IconTabSchema, index: number) {
    this.properties.at(index).controls.type.setValue(tab.value);
  }

}
