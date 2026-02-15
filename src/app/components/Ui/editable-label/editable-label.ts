import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-editable-label',
  imports: [CommonModule, FormsModule, InputText],
  templateUrl: './editable-label.html',
  styleUrl: './editable-label.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableLabel),
      multi: true,
    },
  ],
})
export class EditableLabel implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() fallbackValue: string = '';
  @Input() editable: boolean = true;
  @Output() valueChange = new EventEmitter<string>();

  isEditing: boolean = false;
  tempValue: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  enableEdit() {
    if (!this.editable) return;
    this.isEditing = true;
    this.tempValue = this.value || '';
  }

  save() {
    this.value = this.tempValue || '';
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
    this.isEditing = false;
  }

  cancel() {
    this.isEditing = false;
  }
}
