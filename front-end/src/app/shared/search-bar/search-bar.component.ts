import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input()isHeader: boolean;
  @Output('searchTerm')term: EventEmitter<any> = new EventEmitter();
  @Output('isSearchOpen')isSearchOpen?: EventEmitter<any> = new EventEmitter();

  searchTerm: string;
  toggled: boolean = false;

  constructor(private translate: TranslateService) {
    this.toggled = false;
  }

  ngOnInit() {
  }

  toggle() {
    this.toggled = !this.toggled;
    this.isSearchOpen.emit(this.toggled);
  }

  filterList(value) {
    this.searchTerm = value.srcElement.value;
    this.term.emit(this.searchTerm);

  }

}
