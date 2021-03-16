import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
