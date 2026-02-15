import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableLabel } from './editable-label';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EditableLabel', () => {
  let component: EditableLabel;
  let fixture: ComponentFixture<EditableLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableLabel],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditableLabel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show label and hide input by default', () => {
    const label = fixture.debugElement.query(By.css('.label-text'));
    const input = fixture.debugElement.query(By.css('input'));
    expect(label).toBeTruthy();
    expect(input).toBeFalsy();
  });

  it('should switch to edit mode when label is clicked', async () => {
    const pencil = fixture.debugElement.query(By.css('.edit-icon'));
    pencil.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input).toBeTruthy();
  });

  it('should emit valueChange and update value when save is called', () => {
    spyOn(component.valueChange, 'emit');
    component.enableEdit();
    component.tempValue = 'New Value';
    component.save();

    expect(component.value).toBe('New Value');
    expect(component.valueChange.emit).toHaveBeenCalledWith('New Value');
    expect(component.isEditing).toBeFalse();
  });

  it('should restore previous value when cancel is called', () => {
    component.value = 'Original';
    component.enableEdit();
    component.tempValue = 'Changed';
    component.cancel();

    expect(component.value).toBe('Original');
    expect(component.isEditing).toBeFalse();
  });

  it('should not show pencil icon when editable is false', async () => {
    fixture.componentRef.setInput('editable', false);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const pencil = fixture.debugElement.query(By.css('.edit-icon'));
    expect(pencil).toBeFalsy();
  });

  it('should not enable edit mode when editable is false', () => {
    component.editable = false;
    component.enableEdit();
    expect(component.isEditing).toBeFalse();
  });
});
