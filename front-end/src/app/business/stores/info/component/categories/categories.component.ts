import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StoresService } from '../../../service/stores.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../model/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category;
  constructor(
    private storesService: StoresService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.storesService.getCategoriesByStoreId('store', id).subscribe(res => {
        this.categories = res.categories;
        console.log(this.categories)
      });
    });
  }

  ngOnInit(): void {
  }

}
