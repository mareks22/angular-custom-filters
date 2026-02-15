import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-tabs',
  imports: [],
  templateUrl: './icon-tabs.html',
  styleUrl: './icon-tabs.scss',
})
export class IconTabs implements OnInit {
  @Input() tabs: IconTabSchema[] = [];
  @Input() iconSize: string = '1rem';
  @Input() activeTab: IconTabSchema | null = null;
  @Output() tabChange = new EventEmitter<IconTabSchema>();

  ngOnInit(): void {
    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs[0];
    }
  }

  selectTab(index: number) {
    this.activeTab = this.tabs[index];
    this.tabChange.emit(this.activeTab);
  }
}

export interface IconTabSchema {
  icon: string;
  label: string;
  value: string;
}
