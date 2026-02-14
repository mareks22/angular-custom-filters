import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableLabel } from './editable-label';
import { provideZonelessChangeDetection } from '@angular/core';

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
});
