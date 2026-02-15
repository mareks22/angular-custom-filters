import {FormControl, FormArray, FormGroup} from '@angular/forms';

export interface PropertyForm {
  name: FormControl<string | null>;
  type: FormControl<string | null>;
  value: FormControl<string | null>;
  valueTo: FormControl<string | null>;
  operator: FormControl<string | null>;
}

export interface EventForm {
  type: FormControl<string | null>;
  name: FormControl<string | null>;
  properties: FormArray<FormGroup<PropertyForm>>;
}

export interface FilterForm {
  events: FormArray<FormGroup<EventForm>>;
}

export interface PropertyValue {
  name: string | null;
  type: string | null;
  value: string | null;
  valueTo: string | null;
  operator: string | null;
}

export interface EventValue {
  type: string | null;
  name: string | null;
  properties: PropertyValue[];
}

export interface EventPropertyDefinition {
  property: string;
  type: 'string' | 'number';
}

export interface EventSchema {
  type:
    | 'session_start'
    | 'session_end'
    | 'page_visit'
    | 'purchase'
    | 'cart_update'
    | 'view_item'
    | string;
  properties: EventPropertyDefinition[];
}

export interface RootEventConfig {
  events: EventSchema[];
}

export interface FilterResult {
  steps: {
    event_type: string;
    display_name: string;
    filters: {
      attribute: string;
      operator: string;
      value: string | number;
      value_to?: string | number | null;
      type: 'string' | 'number';
    }[];
  }[];
}

