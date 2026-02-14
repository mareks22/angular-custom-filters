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
