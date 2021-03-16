import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-categories',
  templateUrl: './my-categories.component.html',
  styleUrls: ['./my-categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCategoriesComponent implements OnInit {

  constructor() { }
  filters = [{label: 'By Category', value: 'byCategory'}, {label: 'By Name', value: 'byName'}];

  ngOnInit(): void {
  }

}
