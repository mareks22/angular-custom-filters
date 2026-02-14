import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomFilter } from './custom-filter';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CustomFilter', () => {
  let component: CustomFilter;
  let fixture: ComponentFixture<CustomFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFilter],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
