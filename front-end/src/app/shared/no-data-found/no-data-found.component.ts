import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoDataFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
