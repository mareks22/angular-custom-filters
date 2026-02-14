import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-icon-tabs',
  imports: [],
  templateUrl: './icon-tabs.html',
  styleUrl: './icon-tabs.scss',
})
export class IconTab implements OnInit {

  @Input() tabs: IconTabSchema[] = [];
  @Input() iconSize: string = '1rem';
  private _activeTab: IconTabSchema | null = null;
  @Input() set activeTab(value: IconTabSchema | null) {
    this._activeTab = value;
    if (value) {
      this.selectedTab = value;
    }
  }
  get activeTab(): IconTabSchema | null {
    return this._activeTab;
  }

  @Output() tabChange = new EventEmitter<IconTabSchema>();

  selectedTab: IconTabSchema | null = null

  ngOnInit(): void {
    if (this.activeTab) {
      this.selectedTab = this.activeTab;
    } else {
      this.selectedTab = this.tabs[0];
    }
  }

  selectTab(index: number) {
    this.selectedTab = this.tabs[index];
    this.tabChange.emit(this.selectedTab);
  }
}

export interface IconTabSchema {
  icon: string;
  label: string;
  value: string;
}


