import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconTabs, IconTabSchema } from './icon-tabs';
import { provideZonelessChangeDetection } from '@angular/core';

describe('IconTabs', () => {
  let component: IconTabs;
  let fixture: ComponentFixture<IconTabs>;

  const mockTabs: IconTabSchema[] = [
    { icon: 'pi-user', label: 'User', value: 'user' },
    { icon: 'pi-settings', label: 'Settings', value: 'settings' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconTabs],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(IconTabs);
    component = fixture.componentInstance;
    component.tabs = mockTabs;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all tabs provided in input', () => {
    const tabItems = fixture.debugElement.queryAll(By.css('.tab-item'));
    expect(tabItems.length).toBe(mockTabs.length);
    expect(tabItems[0].nativeElement.textContent).toContain('User');
    expect(tabItems[1].nativeElement.textContent).toContain('Settings');
  });

  it('should select the first tab by default if no activeTab is provided', () => {
    expect(component.selectedTab).toEqual(mockTabs[0]);
    const activeTab = fixture.debugElement.query(By.css('.tab-item.active'));
    expect(activeTab.nativeElement.textContent).toContain('User');
  });

  it('should emit tabChange when a tab is clicked', () => {
    spyOn(component.tabChange, 'emit');
    const tabItems = fixture.debugElement.queryAll(By.css('.tab-item'));
    tabItems[1].triggerEventHandler('click', null);

    expect(component.selectedTab).toEqual(mockTabs[1]);
    expect(component.tabChange.emit).toHaveBeenCalledWith(mockTabs[1]);
  });

  it('should update selectedTab when activeTab input changes', async () => {
    fixture.componentRef.setInput('activeTab', mockTabs[1]);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.selectedTab?.value).toBe(mockTabs[1].value);
    const activeTab = fixture.debugElement.query(By.css('.tab-item.active'));
    expect(activeTab.nativeElement.textContent).toContain('Settings');
  });
});
