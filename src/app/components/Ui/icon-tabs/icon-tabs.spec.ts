import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabs } from './icon-tabs';

describe('IconTabs', () => {
  let component: IconTabs;
  let fixture: ComponentFixture<IconTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
