import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  isViewFilter = false;
  chevronType = 'down';
  selectedFilter: any;

  @Input() values: { label: string, value: string }[];
  // tslint:disable-next-line: no-output-rename
  @Output('filterApplied') applied: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  showFilter() {
    this.isViewFilter = !this.isViewFilter;
    this.chevronType = this.isViewFilter ? 'up' : 'down';
  }

  applyFilter() {
    this.applied.emit(this.selectedFilter);
  }

  changeFilter(value) {
    this.selectedFilter = value.detail.value;
  }
}
